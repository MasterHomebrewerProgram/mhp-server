import Award from "../models/award.model";
import categoryList from "../util/categoryList.util";

const basePath = "./images/awards";

export const runAwardSeeds = async () => {
  console.log("Seeding Award table...");

  return await Award.bulkCreate(
    [
      {
        name: "Braumeister",
        photourl: `${basePath}/Braumeister.png`,
        description:
          "10 or more beers of different subcategories with 43+ scoresheets of German/Austrian/Polish/Czechia origin",
        minScore: 43,
        minRequired: 10,
        categoryList: [
          "3A",
          "3B",
          "3C",
          "4A",
          "4B",
          "4C",
          "5A",
          "5B",
          "5C",
          "6A",
          "6B",
          "6C",
          "7A",
          "7B",
          "8A",
          "8B",
          "9A",
          "9B",
          "10A",
          "10B",
          "10C",
          "23A",
          "23G",
          "27H",
          "27C",
          "27E",
          "27A",
        ],
      },
      {
        name: "Ace American Aler",
        photourl: `${basePath}/Ace American.png`,
        description:
          "10 or more beers of different subcategories with 43+ scoresheets of American origin",
        minScore: 43,
        minRequired: 10,
        categoryList: [
          "1A",
          "1B",
          "1C",
          "1D",
          "18A",
          "18B",
          "19A",
          "19B",
          "19C",
          "20A",
          "20B",
          "20C",
          "21A",
          "21B1",
          "21B2",
          "21B3",
          "21B4",
          "21B5",
          "21B6",
          "21B7",
          "21C",
          "22A",
          "22B",
          "22C",
          "22D",
          "27B",
          "27F",
          "27G",
          "28A",
          "28B",
          "28C",
          "28D",
        ],
      },
      {
        name: "Phénomène Brasseur",
        photourl: `${basePath}/Phenomene Brasseur.png`,
        description:
          "10 or more beers or ciders of different subcategories with 43+ scoresheets with Belgian/Dutch/French origin",
        minScore: 43,
        minRequired: 10,
        categoryList: [
          "2A",
          "2B",
          "2C",
          "23B",
          "23C",
          "23D",
          "23E",
          "23F",
          "24A",
          "24B",
          "24C",
          "25A",
          "25B",
          "25C",
          "26A",
          "26B",
          "26C",
          "26D",
          "C1C",
        ],
      },
      {
        name: "Cask Crusader",
        photourl: `${basePath}/Cask Crusader.png`,
        description:
          "10 or more beers or ciders of different subcategories with 43+ scoresheets of English/Irish/Scottish origin",
        minScore: 43,
        minRequired: 10,
        categoryList: [
          "11A",
          "11B",
          "11C",
          "12A",
          "12B",
          "12C",
          "13A",
          "13B",
          "13C",
          "14A",
          "14B",
          "14C",
          "15A",
          "15B",
          "15C",
          "16A",
          "16B",
          "16C",
          "16D",
          "17A",
          "17B",
          "17C",
          "17D",
          "C1B",
        ],
      },
      {
        name: "Prince of Pucker",
        photourl: `${basePath}/Prince of Pucker.png`,
        description:
          "7 or more beers of different subcategories with 43+ scoresheets that are sours or mixed fermentation",
        minScore: 43,
        minRequired: 7,
        categoryList: [
          "23A",
          "23B",
          "23C",
          "23D",
          "23E",
          "23F",
          "23G",
          "27C",
          "28A",
          "28B",
          "28C",
          "28D",
        ],
      },
      {
        name: "Lord of Lager",
        photourl: `${basePath}/Lord of Lager.png`,
        description:
          "10 or more beers of different subcategories with 43+ scoresheets that are lagers",
        minScore: 43,
        minRequired: 10,
        categoryList: [
          "1A",
          "1B",
          "2A",
          "2B",
          "2C",
          "3A",
          "3B",
          "3C",
          "3D",
          "4A",
          "4B",
          "4C",
          "5A",
          "5C",
          "5D",
          "6A",
          "6B",
          "6C",
          "7A",
          "8A",
          "8B",
          "9A",
          "9B",
          "9C",
          "19B",
          "24C",
          "27A",
          "27F",
        ],
      },
      {
        name: "Master of Mead",
        photourl: `${basePath}/Master of Mead.png`,
        description:
          "7 or more meads of different mead subcategories with 43+ scoresheets",
        minScore: 43,
        minRequired: 7,
        categoryList: categoryList
          .filter((category) => category.cat.includes("M"))
          .map((category) => category.cat + category.subcat),
      },
      {
        name: "Exalted Master of Mead",
        photourl: `${basePath}/Exalted Master of Mead.png`,
        description:
          "1 scoresheet of 43+ score or higher for every sub-category of Mead",
        minScore: 43,
        minRequired: categoryList.filter((category) =>
          category.cat.includes("M")
        ).length,
        categoryList: categoryList
          .filter((category) => category.cat.includes("M"))
          .map((category) => category.cat + category.subcat),
      },
      {
        name: "Cidermaster",
        photourl: `${basePath}/Cidermaster.png`,
        description:
          "5 or more ciders of different cider subcategories with 43+ scoresheets",
        minScore: 43,
        minRequired: 5,
        categoryList: categoryList
          .filter((category) => category.cat.includes("C"))
          .map((category) => category.cat + category.subcat),
      },
      {
        name: "Exalted Cidermaster",
        photourl: `${basePath}/Exalted Cidermaster.png`,
        description:
          "1 scoresheet of 43+ score or higher for every sub-category of Cider",
        minScore: 43,
        minRequired: categoryList.filter((category) =>
          category.cat.includes("C")
        ).length,
        categoryList: categoryList
          .filter((category) => category.cat.includes("C"))
          .map((category) => category.cat + category.subcat),
      },
      {
        name: "Hero of Hops",
        photourl: `${basePath}/Hero of Hops.png`,
        description:
          "7 or more IPAS of different subcategories with 43+ scoresheets",
        minScore: 43,
        minRequired: 7,
        categoryList: [
          "12C",
          "21A",
          "21B1",
          "21B2",
          "21B3",
          "21B4",
          "21B5",
          "21B6",
          "21B7",
          "21C",
          "22A",
        ],
      },
      {
        name: "Exalted Hero of Hops",
        photourl: `${basePath}/Exalted Hero of Hops.png`,
        description:
          "1 scoresheet of 43+ score or higher for every IPA sub-category",
        minScore: 43,
        minRequired: 11,
        categoryList: [
          "12C",
          "21A",
          "21B1",
          "21B2",
          "21B3",
          "21B4",
          "21B5",
          "21B6",
          "21B7",
          "21C",
          "22A",
        ],
      },
      {
        name: "Jack of All Trades",
        photourl: `${basePath}/Jack of All Trades.png`,
        description:
          "1 scoresheet in each category of beer/mead/cider with a minimum score of 30",
        minScore: 30,
        minRequired: Object.keys(
          categoryList.reduce((acc, val) => {
            acc[val.cat] = true;
            return acc;
          }, {})
        ).length,
        categoryList: categoryList.map(
          (category) => category.cat + category.subcat
        ),
        preventCategoryDuplicates: true,
      },
      {
        name: "Exalted Master of Beer",
        description:
          "1 scoresheet of at least 43 score or higher for every sub-category of beer",
        minScore: 43,
        minRequired: categoryList.length,
        categoryList: categoryList.map(
          (category) => category.cat + category.subcat
        ),
      },
    ],
    {
      ignoreDuplicates: true,
    }
  );
};
