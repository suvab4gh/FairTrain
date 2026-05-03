// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IUSDC {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract FairTrainRegistry {
    IUSDC public immutable usdc;

    struct Registration {
        bytes32  contentHash;   // keccak256 of the raw file
        address  creator;       // wallet that registered
        string   ensName;       // e.g. "frida.creator.eth"
        uint96   pricePerKToken;// USDC per 1000 tokens (6 decimals)
        uint64   registeredAt;
    }

    // contentHash → Registration
    mapping(bytes32 => Registration) public registry;
    // contentHash → total USDC earned
    mapping(bytes32 => uint256) public totalEarned;

    event ContentRegistered(
        bytes32 indexed contentHash,
        address indexed creator,
        string  ensName,
        uint96  pricePerKToken
    );

    event DataConsumed(
        bytes32 indexed contentHash,
        address indexed consumer,
        uint64  tokenCount,
        uint256 usdcPaid,
        uint256 timestamp
    );

    constructor(address _usdc) {
        usdc = IUSDC(_usdc);
    }

    function register(
        bytes32 contentHash,
        string calldata ensName,
        uint96  pricePerKToken
    ) external {
        require(registry[contentHash].creator == address(0), "Already registered");
        registry[contentHash] = Registration({
            contentHash:    contentHash,
            creator:        msg.sender,
            ensName:        ensName,
            pricePerKToken: pricePerKToken,
            registeredAt:   uint64(block.timestamp)
        });
        emit ContentRegistered(contentHash, msg.sender, ensName, pricePerKToken);
    }

    // Called by the AI pipeline SDK before ingesting content.
    // Consumer must have approved this contract to spend USDC.
    function consume(bytes32 contentHash, uint64 tokenCount) external {
        Registration memory reg = registry[contentHash];
        require(reg.creator != address(0), "Content not registered");

        uint256 due = (uint256(tokenCount) * reg.pricePerKToken) / 1000;
        if (due > 0) {
            usdc.transferFrom(msg.sender, reg.creator, due);
            totalEarned[contentHash] += due;
        }

        emit DataConsumed(contentHash, msg.sender, tokenCount, due, block.timestamp);
    }

    function getTerms(bytes32 contentHash) external view
        returns (address creator, string memory ensName, uint96 pricePerKToken)
    {
        Registration memory r = registry[contentHash];
        return (r.creator, r.ensName, r.pricePerKToken);
    }
}
