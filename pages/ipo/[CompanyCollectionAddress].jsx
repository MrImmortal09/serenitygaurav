import {
  MediaRenderer,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractEvents,
  useActiveClaimCondition,
  useClaimNFT,
  useValidDirectListings,
  useValidEnglishAuctions,
  Web3Button,
} from "@thirdweb-dev/react";
import { createThirdwebClient, getContract } from "thirdweb";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  NETWORK,
  NFT_COLLECTION_ADDRESS,
  NFT_COLLECTION_ADDRESSS,
} from "../../const/contractAddresses";
import randomColor from "../../util/randomColor";
import Skeleton from "../../components/Skeleton/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";
import { sepolia } from "thirdweb/chains";
const [randomColor1, randomColor2] = [randomColor(), randomColor()];
import { prepareContractCall, resolveMethod } from "thirdweb";
import { useSendTransaction } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import styles from "../../styles/ipo.module.css";

//-----------------------------------------------

export default function TokenPage({ nft, contractMetadata }) {
  const router = useRouter();
  const { CompanyCollectionAddress } = router.query;
  const client = createThirdwebClient({
    clientId: "87407747d9b3db5ef79631fa33233ab1",
  });
  const { contract } = useContract(CompanyCollectionAddress);
  const [metadata, setMetadata] = useState(null);
  const wallet_address = useAddress();

  // claming nfts
  const { mutateAsync: claimNft, isLoading, error } = useClaimNFT(contract);

  if (error) {
    console.error("failed to claim nft", error);
  }
  const {
    data,
    isLoading: loading,
    error: errorof,
  } = useActiveClaimCondition(contract);

  // claming nfts

  // metadata of stock
  useEffect(() => {
    getMetaData();
  }, [contract, metadata]);

  const getMetaData = async () => {
    let metadata = await contract?.metadata.get();
    setMetadata(metadata);
  };
  // metadata of stock

  useEffect(() => {
    if (!loading) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        {/* {console.log(docum)} */}
        <Toaster position="bottom-center" reverseOrder={false} />
        <Container maxWidth="lg">
          


          <div>

          <div style={{
            display: "flex",
            margin: "10px"
          }}>
            {metadata && (
            <ThirdwebNftMedia metadata={metadata} height={100} width={100} />
          )}
          <h1>{metadata?.name}</h1>
          <div>{data?.currencyMetadata.displayValue}</div>

          </div>
          {/* <p>{metadata?.description}</p> */}
          <div>Start Time --- {data?.startTime.toDateString()}</div>
          <div>Stocks Left ---- {data?.availableSupply}</div>
          <div>limit -----------{data?.maxClaimablePerWallet}</div>
          <div>
            issue size --{" "}
            {Number(data?.maxClaimableSupply) *
              Number(data?.currencyMetadata.displayValue)}
          </div>
          <Web3Button
            contractAddress={CompanyCollectionAddress}
            action={() =>
              claimNft({
                to: wallet_address, // Use useAddress hook to get current wallet address
                quantity: 1,
              })
            }
            >
            Claim NFT
          </Web3Button>
            </div>
        </Container>
      </div>
    </>
  );
}

export const getStaticProps = async (context) => {
  const CompanyCollectionAddress = context.params?.CompanyCollectionAddress;

  const sdk = new ThirdwebSDK(NETWORK, {
    secretKey: process.env.TW_SECRET_KEY,
  });

  const contract = await sdk.getContract(CompanyCollectionAddress);

  // const nft = await contract.erc721.get(CompanyCollectionAddress)

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {}

  return {
    props: {
      // nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1, // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  };
};

export const getStaticPaths = async () => {
  const sdk = new ThirdwebSDK(NETWORK, {
    secretKey: process.env.TW_SECRET_KEY,
  });

  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);

  const collects = NFT_COLLECTION_ADDRESSS;
  const paths = collects.map((address) => {
    console.log(address.address);
    return {
      params: {
        CompanyCollectionAddress: address.address,
      },
    };
  });

  return {
    paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
};
