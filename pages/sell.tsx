import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React, { useState } from "react";

import SellCollection from "../components/sellCollection"
import { NFT_COLLECTION_ADDRESSS } from "../const/contractAddresses";

export default function Sell() {

  return (
    <>
    <h1>Sell NFTs</h1>
    <p>Select which NFT you&rsquo;d like to sell below.</p>
      {NFT_COLLECTION_ADDRESSS.map((address)=>
        <SellCollection NFT_COLLECTION_ADDRESS={address.address}/>
    )}
    
    </>
  );
}
