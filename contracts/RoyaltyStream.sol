// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IUSDC {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

interface IRegistry {
    function getTerms(bytes32 contentHash) external view returns (address creator, string memory ensName, uint96 pricePerKToken);
    function consume(bytes32 contentHash, uint64 tokenCount) external;
}

contract RoyaltyStream {
    address public keeper;         // KeeperHub executor address
    address public registry;       // FairTrainRegistry
    IUSDC   public immutable usdc;

    mapping(address => uint256) public balance; // consumer → deposited USDC

    event Deposited(address indexed consumer, uint256 amount);
    event Executed(address indexed consumer, bytes32 contentHash, uint256 amount);

    constructor(address _usdc, address _registry, address _keeper) {
        usdc     = IUSDC(_usdc);
        registry = _registry;
        keeper   = _keeper;
    }

    function deposit(uint256 amount) external {
        usdc.transferFrom(msg.sender, address(this), amount);
        balance[msg.sender] += amount;
        emit Deposited(msg.sender, amount);
    }

    // KeeperHub calls this. It approves the registry to pull `due` USDC
    // then calls registry.consume() on behalf of the AI company.
    function executeConsumption(
        address consumer,
        bytes32 contentHash,
        uint64  tokenCount
    ) external {
        require(msg.sender == keeper, "Only keeper");
        // calculate due
        (, , uint96 pricePerKToken) = IRegistry(registry).getTerms(contentHash);
        uint256 due = (uint256(tokenCount) * pricePerKToken) / 1000;
        require(balance[consumer] >= due, "Insufficient balance");
        balance[consumer] -= due;
        usdc.approve(registry, due);
        IRegistry(registry).consume(contentHash, tokenCount);
        emit Executed(consumer, contentHash, due);
    }
}
