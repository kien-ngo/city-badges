import fetch from "node-fetch";
const ipfs_files = [
  // Pinata
  {
    label: "Munich",
    cid: "QmXdyqhWSHsSy6bchP1cexV64t5zrmfP6JCXGVhiFPaWVM",
  },
  {
    label: "Frankfurt",
    cid: "QmaRdjBuEFQuGMJKxshd4aNiM97jFoieWzRC3YVxAR61Fu",
  },
  {
    label: "Berlin",
    cid: "QmbeYSrhRzkZ1h5PbyCPFQCV6cmpHyUkFuHgXntGkiAd5P",
  },
  {
    label: "Amsterdam",
    cid: "Qmck3jpzbD2WibH5GLCCZrZyUVW6VUk7KRxRRBxsEPaLVt",
  },
  {
    label: "Paris",
    cid: "QmYKGgypBmaDvYw3qHpZCFhF7b9RsBktgNxgvv6ZpRFJmw",
  },
  {
    label: "Vienna",
    cid: "QmfRJaXDGCdnFrZHBoEue2CWs6puz2nZ4qgJxbKpyEVbRJ",
  },
  {
    label: "Syracuse",
    cid: "QmRZ8dBRKwXWraMisqHWd5xkQJZA5Dnh3BD8UuTnjKvcJL",
  },
  {
    label: "New_York",
    cid: "QmPebEFmUhq4xobop8uo6Nx2f7pm9Rd4Pwa17Lp4FSi1ud",
  },
  {
    label: "Baltimore",
    cid: "QmRKq9h76awH1RyzbZYJMgYZNTB1Rqt8HWSAVmW2LcPcFQ",
  },
  {
    label: "Winnipeg",
    cid: "QmWaguwqg8EAhQWrftkfT4u1AHsRHtS2MJVf6cUvb6SpJZ",
  },
  {
    label: "Vancouver",
    cid: "QmQxYjNdUPGXBC1sX1c8WWuwmq7S6FLR2xJKMbBYSzRGJo",
  },
  {
    label: "Toronto",
    cid: "QmaUN81MtipKDLzS1NGBz1h3RuHBoDTJar8wMZVHrWv2sJ",
  },
  {
    label: "Montreal",
    cid: "QmUu8NxKsNBLm1dTrjhynKgByceAnXwPwSSyh7yL86Rmvg",
  },
  // NFT.Storage
  {
    label: "Vung_Tau",
    cid: "bafybeiep2574gf6z3qbenp5twmcuzzmk5vp3a77rhw7wpjufy7yfxzcwiu",
  },
  {
    label: "Da_Lat",
    cid: "bafybeidchbpp2sy67lg7oepocqkd3gihnssdz2trg4qpvfqg4geossar5u",
  },
  {
    label: "Ha_Noi",
    cid: "bafybeihthtvfiix2wg46brtos6njemx6igms26cfgwwmgo4iamyrehsgna",
  },
  {
    label: "Thai_Binh",
    cid: "bafybeig3nf4q6jlchogykyesrcvpo3pst6dh46ii3lykpozzuxrdrnpruu",
  },
  {
    label: "Sai_Gon",
    cid: "bafybeicis4wajbms5ch7cz6v6nckabzxkp35qowghxnxzawe57ov24lgbe",
  },
  {
    label: "Kuala_Lumpur",
    cid: "bafybeigvr7pde5maq2sjckv7hzz4bsuj2btxdf45g3igcyk562kupni4yu",
  },
  {
    label: "Incheon",
    cid: "bafybeifttnzxfph5c5fpvlvku3laov74byocqrlolj666csx5ydwo6sweu",
  },
  {
    label: "Narita",
    cid: "bafybeiguy47xzpxn5flj5wqy3flrtjq5hentm4qs6aq6zzqtqvz2yyd55q",
  },
  {
    label: "Tokyo",
    cid: "bafybeibt6ud22gxmyyefyqrg76mklzxx6golxrdxzwepk3fid7252ojkpu",
  },
  {
    label: "Hongkong",
    cid: "bafybeifff6rel4hcidchvifbtzbbee6lbf4th7i67njo7x6xzqwqlc4mri",
  },
  {
    label: "Shanghai",
    cid: "bafybeia2fgiexzenqwktjh6onw3pmkhuiqlixon74o6loy46li6iydzfcq",
  },
  {
    label: "Phnom_Penh",
    cid: "bafybeidqvjiq2gp62sowqnkw7idskdamfuh6fbvbxmhchw5paw65mpmkze",
  },
  {
    label: "Vientiane",
    cid: "bafybeif2nlgg75lfwysejzj72qq6nu5lc6qktea35j4aapf46xkr3z4b3q",
  },
  {
    label: "Lyon",
    cid: "bafybeibrfckk6okateinclqhn3kddn7o7ngqqcpyqmfjhsukdinrxzarui",
  },
  {
    label: "Naple, Italy",
    cid: "bafybeighfsditxk5qgcnrx2ydipbrct4trd4u5xfnjr2i3oyvvlq6ip5ee",
  },
  {
    label: "Prague, Czechia",
    cid: "bafybeia4trxb4z73ihbihn7anxciavkofc5pw4pyq7f2yddf3eaxibip7m",
  },
  {
    label: "London, England",
    cid: "bafybeidru3xvdwstxkp2x5shiwrqoeionzbcrwlzy24vcttrvfmjewworu",
  },
];

const pin = async (cid, name) => {
  const data = {
    cid: cid,
    name: name,
  };
  return fetch("https://api.nft.storage/pins", {
    body: JSON.stringify(data),
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${process.env.NFT_STORAGE_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((res) => res.json())
    .then((_res) => console.log(_res));
};

ipfs_files.forEach((item) => pin(item.cid, item.label));
