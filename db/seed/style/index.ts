import Style from '../../models/style.model'

export const runStyleSeeds = async () => {
  console.log("Seeding styles...")

  return await Style.bulkCreate([

    // BEERS
    {
      cat: "1",
      subcat: "A",
      name: "American Light Lager",
      isLager: true
    },
    {
      cat: "1",
      subcat: "B",
      name: "American Lager",
      isLager: true
    },
    {
      cat: "1",
      subcat: "C",
      name: "Cream Ale",
      isLager: true
    },
    {
      cat: "1",
      subcat: "D",
      name: "American Wheat Beer",
    },
    {
      cat: "2",
      subcat: "A",
      name: "International Pale Lager",
      isLager: true
    },
    {
      cat: "2",
      subcat: "B",
      name: "International Amber Lager",
      isLager: true
    },
    {
      cat: "2",
      subcat: "C",
      name: "International Dark Lager",
      isLager: true
    },
    {
      cat: "3",
      subcat: "A",
      name: "Czech Pale Lager",
      isLager: true
    },
    {
      cat: "3",
      subcat: "B",
      name: "Czech Premium Pale Lager",
      isLager: true
    },
    {
      cat: "3",
      subcat: "C",
      name: "Czech Amber Lager",
      isLager: true
    },
    {
      cat: "3",
      subcat: "D",
      name: "Czech Dark Lager",
      isLager: true
    },
    {
      cat: "4",
      subcat: "A",
      name: "Munich Helles",
      isLager: true
    },
    {
      cat: "4",
      subcat: "B",
      name: "Festbier",
      isLager: true
    },
    {
      cat: "4",
      subcat: "C",
      name: "Helles Bock",
      isLager: true
    },
    {
      cat: "5",
      subcat: "A",
      name: "German Leichtbier",
    },
    {
      cat: "5",
      subcat: "B",
      name: "Kolsch",
    },
    {
      cat: "5",
      subcat: "C",
      name: "German Helles Exportbier",
      isLager: true
    },
    {
      cat: "5",
      subcat: "D",
      name: "German Pils",
      isLager: true
    },
    {
      cat: "6",
      subcat: "A",
      name: "Marzen",
      isLager: true
    },
    {
      cat: "6",
      subcat: "B",
      name: "Rauchbier",
      isLager: true
    },
    {
      cat: "6",
      subcat: "C",
      name: "Dunkles Bock",
      isLager: true
    },
    {
      cat: "7",
      subcat: "A",
      name: "Vienna Lager",
      isLager: true
    },
    {
      cat: "7",
      subcat: "B",
      name: "Altbier",
      isLager: true
    },
    {
      cat: "8",
      subcat: "A",
      name: "Munich Dunkel",
      isLager: true
    },
    {
      cat: "8",
      subcat: "B",
      name: "Schwarzbier",
      isLager: true
    },
    {
      cat: "9",
      subcat: "A",
      name: "Doppelbock",
      isLager: true
    },
    {
      cat: "9",
      subcat: "B",
      name: "Eisbock",
      isLager: true
    },
    {
      cat: "9",
      subcat: "C",
      name: "Baltic Porter",
      isLager: true
    },
    {
      cat: "10",
      subcat: "A",
      name: "Weissbier",
    },
    {
      cat: "10",
      subcat: "B",
      name: "Dunkles Weissbier",
    },
    {
      cat: "10",
      subcat: "C",
      name: "Weizenbock",
    },
    {
      cat: "11",
      subcat: "A",
      name: "Ordinary Bitter",
    },
    {
      cat: "11",
      subcat: "B",
      name: "Best Bitter",
    },
    {
      cat: "11",
      subcat: "C",
      name: "Strong Bitter",
    },
    {
      cat: "12",
      subcat: "A",
      name: "British Golden Ale",
    },
    {
      cat: "12",
      subcat: "B",
      name: "Australian Sparkling Ale",
    },
    {
      cat: "12",
      subcat: "C",
      name: "English IPA",
    },
    {
      cat: "13",
      subcat: "A",
      name: "Dark Mild",
    },
    {
      cat: "13",
      subcat: "B",
      name: "British Brown Ale",
    },
    {
      cat: "13",
      subcat: "C",
      name: "English Porter",
    },
    {
      cat: "14",
      subcat: "A",
      name: "Scottish Light",
    },
    {
      cat: "14",
      subcat: "B",
      name: "Scottish Heavy",
    },
    {
      cat: "14",
      subcat: "C",
      name: "Scottish Export",
    },
    {
      cat: "15",
      subcat: "A",
      name: "Irish Red Ale",
    },
    {
      cat: "15",
      subcat: "B",
      name: "Irish Stout",
    },
    {
      cat: "15",
      subcat: "C",
      name: "Irish Extra Stou",
    },
    {
      cat: "16",
      subcat: "A",
      name: "Sweet Stout",
    },
    {
      cat: "16",
      subcat: "B",
      name: "Oatmeal Stout",
    },
    {
      cat: "16",
      subcat: "C",
      name: "Tropical Stout",
    },
    {
      cat: "16",
      subcat: "D",
      name: "Foreign Extra Stout",
    },
    {
      cat: "17",
      subcat: "A",
      name: "British Strong Ale",
    },
    {
      cat: "17",
      subcat: "B",
      name: "Old Ale",
    },
    {
      cat: "17",
      subcat: "C",
      name: "Wee Heavy",
    },
    {
      cat: "17",
      subcat: "D",
      name: "English Barley Wine",
    },
    {
      cat: "18",
      subcat: "A",
      name: "Blonde Ale",
    },
    {
      cat: "18",
      subcat: "B",
      name: "American Pale Ale",
    },
    {
      cat: "19",
      subcat: "A",
      name: "American Amber Ale",
    },
    {
      cat: "19",
      subcat: "B",
      name: "California Common",
    },
    {
      cat: "19",
      subcat: "C",
      name: "American Brown Ale",
    },
    {
      cat: "20",
      subcat: "A",
      name: "American Porter",
    },
    {
      cat: "20",
      subcat: "B",
      name: "American Stout",
    },
    {
      cat: "20",
      subcat: "C",
      name: "Imperial Stout",
    },
    {
      cat: "21",
      subcat: "A",
      name: "American IPA",
    },
    {
      cat: "21",
      subcat: "B1",
      name: "Belgian IPA",
    },
    {
      cat: "21",
      subcat: "B2",
      name: "Black IPA",
    },
    {
      cat: "21",
      subcat: "B3",
      name: "Brown IPA",
    },
    {
      cat: "21",
      subcat: "B4",
      name: "Red IPA",
    },
    {
      cat: "21",
      subcat: "B5",
      name: "Rye IPA",
    },
    {
      cat: "21",
      subcat: "B6",
      name: "White IPA",
    },
    {
      cat: "21",
      subcat: "B7",
      name: "Brut IPA",
    },
    {
      cat: "21",
      subcat: "C",
      name: "Hazy IPA",
    },
    {
      cat: "22",
      subcat: "A",
      name: "Double IPA",
    },
    {
      cat: "22",
      subcat: "B",
      name: "American Strong Ale",
    },
    {
      cat: "22",
      subcat: "C",
      name: "American Barleywine",
    },
    {
      cat: "22",
      subcat: "D",
      name: "Wheatwine",
    },
    {
      cat: "23",
      subcat: "A",
      name: "Berliner Weisse",
      isSour: true
    },
    {
      cat: "23",
      subcat: "B",
      name: "Flanders Red Ale",
      isSour: true
    },
    {
      cat: "23",
      subcat: "C",
      name: "Oud Bruin",
      isSour: true
    },
    {
      cat: "23",
      subcat: "D",
      name: "Lambic",
      isSour: true
    },
    {
      cat: "23",
      subcat: "E",
      name: "Gueuze",
      isSour: true
    },
    {
      cat: "23",
      subcat: "F",
      name: "Fruit Lambic",
      isSour: true
    },
    {
      cat: "23",
      subcat: "G",
      name: "Gose",
      isSour: true
    },
    {
      cat: "24",
      subcat: "A",
      name: "Witbier",
    },
    {
      cat: "24",
      subcat: "B",
      name: "Belgian Pale Ale",
    },
    {
      cat: "24",
      subcat: "C",
      name: "Biere de Garde",
    },
    {
      cat: "25",
      subcat: "A",
      name: "Belgian Blond Ale",
    },
    {
      cat: "25",
      subcat: "B",
      name: "Saison",
    },
    {
      cat: "25",
      subcat: "C",
      name: "Belgian Golden Strong Ale",
    },
    {
      cat: "26",
      subcat: "A",
      name: "Belgian Single",
    },
    {
      cat: "26",
      subcat: "B",
      name: "Belgian Dubbel",
    },
    {
      cat: "26",
      subcat: "C",
      name: "Belgian Tripel",
    },
    {
      cat: "26",
      subcat: "D",
      name: "Belgian Dark Strong Ale",
    },
    {
      cat: "27",
      subcat: "A",
      name: "Kellerbier",
      isLager: true
    },
    {
      cat: "27",
      subcat: "B",
      name: "Kentucky Common",
    },
    {
      cat: "27",
      subcat: "C",
      name: "Lichtenhainer",
      isSour: true
    },
    {
      cat: "27",
      subcat: "D",
      name: "London Brown Ale",
    },
    {
      cat: "27",
      subcat: "E",
      name: "Piwo Grodziskie",
    },
    {
      cat: "27",
      subcat: "F",
      name: "Pre-Prohibition Lager",
      isLager: true
    },
    {
      cat: "27",
      subcat: "G",
      name: "Pre-Prohibition Porter",
    },
    {
      cat: "27",
      subcat: "H",
      name: "Roggenbier",
    },
    {
      cat: "27",
      subcat: "I",
      name: "Sahti",
    },
    {
      cat: "28",
      subcat: "A",
      name: "Brett Beer",
      isSour: true
    },
    {
      cat: "28",
      subcat: "B",
      name: "Mixed-Fermentation Sour Beer",
      isSour: true
    },
    {
      cat: "28",
      subcat: "C",
      name: "Wild Specialty Beer",
      isSour: true
    },
    {
      cat: "28",
      subcat: "D",
      name: "Straight Sour Beer",
      isSour: true
    },
    {
      cat: "29",
      subcat: "A",
      name: "Fruit Beer",
    },
    {
      cat: "29",
      subcat: "B",
      name: "Fruit and Spice Beer",
    },
    {
      cat: "29",
      subcat: "C",
      name: "Specialty Fruit Beer",
    },
    {
      cat: "29",
      subcat: "D",
      name: "Grape Ale",
    },
    {
      cat: "30",
      subcat: "A",
      name: "Spice, Herb, or Vegetable Beer",
    },
    {
      cat: "30",
      subcat: "B",
      name: "Autumn Seasonal Beer",
    },
    {
      cat: "30",
      subcat: "C",
      name: "Winter Seasonal Beer",
    },
    {
      cat: "30",
      subcat: "D",
      name: "Specialty Spice Beer",
    },
    {
      cat: "31",
      subcat: "A",
      name: "Alternative Grain Beer",
    },
    {
      cat: "31",
      subcat: "B",
      name: "Alternative Sugar Beer",
    },
    {
      cat: "32",
      subcat: "A",
      name: "Classic Style Smoked Beer",
    },
    {
      cat: "32",
      subcat: "B",
      name: "Specialty Smoked Beer",
    },
    {
      cat: "33",
      subcat: "A",
      name: "Wood-Aged Beer",
    },
    {
      cat: "33",
      subcat: "B",
      name: "Specialty Wood-Aged Beer",
    },
    {
      cat: "34",
      subcat: "A",
      name: "Commercial Specialty Beer",
    },
    {
      cat: "34",
      subcat: "B",
      name: "Mixed-Style Beer",
    },
    {
      cat: "34",
      subcat: "C",
      name: "Experimental Beer",
    },
    {
      cat: "X",
      subcat: "1",
      name: "Dorada Pampeana",
    },
    {
      cat: "X",
      subcat: "2",
      name: "IPA Argenta",
    },
    {
      cat: "X",
      subcat: "3",
      name: "Italian Grape Ale",
    },
    {
      cat: "X",
      subcat: "4",
      name: "Catharina Sour",
    },
    {
      cat: "X",
      subcat: "5",
      name: "New Zealand Pilsner ",
    },

    // MEADS
    {
      cat: "M1",
      subcat: "A",
      name: "Dry Mead",
      isMead: true
    },
    {
      cat: "M1",
      subcat: "B",
      name: "Semi-Sweet Mead",
      isMead: true
    },
    {
      cat: "M1",
      subcat: "C",
      name: "Sweet Mead",
      isMead: true
    },
    {
      cat: "M2",
      subcat: "A",
      name: "Cyser",
      isMead: true
    },
    {
      cat: "M2",
      subcat: "B",
      name: "Pyment",
      isMead: true
    },
    {
      cat: "M2",
      subcat: "C",
      name: "Berry Mead",
      isMead: true
    },
    {
      cat: "M2",
      subcat: "D",
      name: "Stone Fruit Mead",
      isMead: true
    },
    {
      cat: "M2",
      subcat: "E",
      name: "Melomel",
      isMead: true
    },
    {
      cat: "M3",
      subcat: "A",
      name: "Fruit and Spice Mead",
      isMead: true
    },
    {
      cat: "M3",
      subcat: "B",
      name: "Spice, Herb or Vegetable Mead",
      isMead: true
    },
    {
      cat: "M4",
      subcat: "A",
      name: "Braggot",
      isMead: true
    },
    {
      cat: "M4",
      subcat: "B",
      name: "Historical Mead",
      isMead: true
    },
    {
      cat: "M4",
      subcat: "C",
      name: "Experimental Mead",
      isMead: true
    },

    // CIDER
    {
      cat: "C1",
      subcat: "A",
      name: "New World Cider",
      isCider: true
    },
    {
      cat: "C1",
      subcat: "B",
      name: "English Cider",
      isCider: true
    },
    {
      cat: "C1",
      subcat: "C",
      name: "French Cider",
      isCider: true
    },
    {
      cat: "C1",
      subcat: "D",
      name: "New World Perry",
      isCider: true
    },
    {
      cat: "C1",
      subcat: "E",
      name: "Traditional Perry",
      isCider: true
    },
    {
      cat: "C2",
      subcat: "A",
      name: "New England Cider",
      isCider: true
    },
    {
      cat: "C2",
      subcat: "B",
      name: "Cider with Other Fruit",
      isCider: true
    },
    {
      cat: "C2",
      subcat: "C",
      name: "Applewine",
      isCider: true
    },
    {
      cat: "C2",
      subcat: "D",
      name: "Ice Cider",
      isCider: true
    },
    {
      cat: "C2",
      subcat: "E",
      name: "Cider with Herbs/Spices",
      isCider: true
    },
    {
      cat: "C2",
      subcat: "F",
      name: "Specialty Cider/Perry",
      isCider: true
    }    
  ], {
    ignoreDuplicates: true
  })
}