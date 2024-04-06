import NFTGrid from "./NFT/NFTGrid";
import { useContract, useNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useEffect, useState } from 'react';
import Link from "next/link";
export default function CompanyCollection({ company }) {
    const { contract } = useContract(company?.address);
    const [metadata, setMetadata] = useState(null);
    useEffect(() => {
        getMetaData();
    }, [contract, metadata])
    const getMetaData = async () => {
        let metadata = await contract?.metadata.get();
        setMetadata(metadata);
    }
    return (
        
        <Link 
         href={`/ipo/${company?.address}`}
        key={company}
        >
        <div className="collection">
            <div className="collectionName">{company?.name}</div>
            {metadata &&
                <div className="company">
                    <ThirdwebNftMedia
                        metadata={metadata}
                        height={100}
                        width={100}
                    />
                    <div className="currentMarketPrice">0.0002 ETH</div>
                    <div className="priceChange">+0.00002 (10%)</div>
                </div>
                || <div>Loading...</div>
            }
        </div></Link>
        
    );
}