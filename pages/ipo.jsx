
// import NFTGrid from  "../components/NFT/NFTGrid";//"../components/NFTGrid";
import { NFT_COLLECTION_ADDRESSS } from  "../const/contractAddresses";//"../consts/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { useEffect } from 'react';
import CompanyCollection from  "../components/campanyCollectionsIPO" ;// '../components/companyCollections';

  const Ipo=()=> {
    return (
        <div >
            <div className="title">Ipo</div>
            <div className="compContainer" >
                {NFT_COLLECTION_ADDRESSS.map((company, i) =>
                    <CompanyCollection company={company} key={i} />
                )}
            </div>
        </div>
    );
}

export default Ipo