pragma solidity ^0.5.0;

import "../common/Decimal.sol";

library GP {
    function trimGasPriceChangeRatio(uint256 x) internal pure returns (uint256) {
        if (x > Decimal.unit() * 105 / 100) {
            return Decimal.unit() * 105 / 100;
        }
        if (x < Decimal.unit() * 95 / 100) {
            return Decimal.unit() * 95 / 100;
        }
        return x;
    }

    function trimMinGasPrice(uint256 x, uint256 minTrimPrice) internal pure returns (uint256) {
        if (x > 1000000 * 1e9) {
            return 1000000 * 1e9;
        }
        if (x < minTrimPrice) {
            return minTrimPrice;
        }
        return x;
    }
}
