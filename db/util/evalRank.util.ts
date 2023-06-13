import Rank, { RankProgress } from "../models/rank.model";
import Scoresheet from "../models/scoresheet.model";
import Style from "../models/style.model";
import categoryList, { mixedFermentationSours } from "./categoryList.util";

export default (
  scoresheets: Array<Scoresheet & { Style: Style }>,
  rank: Rank
): RankProgress => {
  const total_approved = {};
  const total_unapproved = {};
  const categories_approved = {};
  const categories_unapproved = {};
  let slmc_approved = 0;
  let slmc_unapproved = 0;
  let lager_approved = 0;
  let lager_unapproved = 0;
  let sour_approved = 0;
  let sour_unapproved = 0;
  let mead_approved = 0;
  let mead_unapproved = 0;
  let cider_approved = 0;
  let cider_unapproved = 0;
  let mixed_sour_approved = 0;
  let mixed_sour_unapproved = 0;

  scoresheets.forEach((scoresheet) => {
    if (scoresheet.score >= rank.minScore) {
      const categoryString = scoresheet.Style.cat + scoresheet.Style.subcat;
      const isSourLagerMeadCider =
        scoresheet.Style.isSour ||
        scoresheet.Style.isLager ||
        scoresheet.Style.isMead ||
        scoresheet.Style.isCider;

      if (scoresheet.approved) {
        total_approved[categoryString] = true;
        categories_approved[scoresheet.Style.cat] = true;

        if (isSourLagerMeadCider) {
          slmc_approved += 1;
        }

        if (scoresheet.Style.isLager) {
          lager_approved += 1;
        }

        if (scoresheet.Style.isSour) {
          sour_approved += 1;
        }

        if (scoresheet.Style.isMead) {
          mead_approved += 1;
        }

        if (scoresheet.Style.isCider) {
          cider_approved += 1;
        }

        if (mixedFermentationSours.includes(categoryString)) {
          mixed_sour_approved += 1;
        }
      }

      total_unapproved[categoryString] = true;
      categories_unapproved[scoresheet.Style.cat] = true;

      if (isSourLagerMeadCider) {
        slmc_unapproved += 1;
      }

      if (scoresheet.Style.isLager) {
        lager_unapproved += 1;
      }

      if (scoresheet.Style.isSour) {
        sour_unapproved += 1;
      }

      if (scoresheet.Style.isMead) {
        mead_unapproved += 1;
      }

      if (scoresheet.Style.isCider) {
        cider_unapproved += 1;
      }
      if (mixedFermentationSours.includes(categoryString)) {
        mixed_sour_unapproved += 1;
      }
    }
  });

  const sheetsApproved =
    Object.keys(total_approved).length >= rank.minSubcats &&
    Object.keys(categories_approved).length >= rank.minCats &&
    slmc_approved >= rank.minSlmc &&
    lager_approved >= rank.minLagers &&
    sour_approved >= rank.minSours &&
    mead_approved >= rank.minMeads &&
    cider_approved >= rank.minCiders &&
    mixed_sour_approved >= rank.minMixedSours;

  const achieved =
    Object.keys(total_unapproved).length >= rank.minSubcats &&
    Object.keys(categories_unapproved).length >= rank.minCats &&
    slmc_unapproved >= rank.minSlmc;
  lager_unapproved >= rank.minLagers &&
    sour_unapproved >= rank.minSours &&
    mead_unapproved >= rank.minMeads &&
    cider_unapproved >= rank.minCiders &&
    mixed_sour_unapproved >= rank.minMixedSours;

  const requirements = !achieved
    ? [
        {
          description: `${rank.minSubcats} styles ${rank.minScore}+`,
          categories: categoryList
            .map((category) => category.cat + category.subcat)
            .filter(
              (categoryString) =>
                !Object.keys(total_unapproved).includes(categoryString)
            ),
          completed: Math.min(
            Object.keys(total_unapproved).length,
            rank.minSubcats
          ),
          total: rank.minSubcats,
        },
        {
          description: `${rank.minCats} categories ${rank.minScore}+`,
          categories: categoryList
            .map((category) => category.cat + category.subcat)
            .filter(
              (categoryString) =>
                !Object.keys(categories_unapproved).includes(categoryString)
            ),
          completed: Math.min(
            Object.keys(categories_unapproved).length,
            rank.minCats
          ),
          total: rank.minCats,
        },
        ...(!!rank.minSlmc
          ? [
              {
                description: `${rank.minSlmc} styles ${rank.minScore}+ sour/mead/lager/cider`,
                categories: categoryList
                  .filter(
                    (category) =>
                      category.isSour ||
                      category.isLager ||
                      category.isMead ||
                      category.isCider
                  )
                  .map((category) => category.cat + category.subcat)
                  .filter(
                    (categoryString) =>
                      !Object.keys(total_unapproved).includes(categoryString)
                  ),
                completed: Math.min(slmc_unapproved, rank.minSlmc),
                total: rank.minSlmc,
              },
            ]
          : []),
        ...(!!rank.minLagers
          ? [
              {
                description: `${rank.minLagers} styles ${rank.minScore}+ lager`,
                categories: categoryList
                  .filter((category) => category.isLager)
                  .map((category) => category.cat + category.subcat)
                  .filter(
                    (categoryString) =>
                      !Object.keys(total_unapproved).includes(categoryString)
                  ),
                completed: Math.min(lager_unapproved, rank.minLagers),
                total: rank.minLagers,
              },
            ]
          : []),
        ...(!!rank.minCiders
          ? [
              {
                description: `${rank.minCiders} styles ${rank.minScore}+ cider`,
                categories: categoryList
                  .filter((category) => category.isCider)
                  .map((category) => category.cat + category.subcat)
                  .filter(
                    (categoryString) =>
                      !Object.keys(total_unapproved).includes(categoryString)
                  ),
                completed: Math.min(cider_unapproved, rank.minCiders),
                total: rank.minCiders,
              },
            ]
          : []),
        ...(!!rank.minMeads
          ? [
              {
                description: `${rank.minMeads} styles ${rank.minScore}+ meads`,
                categories: categoryList
                  .filter((category) => category.isMead)
                  .map((category) => category.cat + category.subcat)
                  .filter(
                    (categoryString) =>
                      !Object.keys(total_unapproved).includes(categoryString)
                  ),
                completed: Math.min(mead_unapproved, rank.minMeads),
                total: rank.minMeads,
              },
            ]
          : []),
        ...(!!rank.minSours
          ? [
              {
                description: `${rank.minSours} styles ${rank.minScore}+ sours`,
                categories: categoryList
                  .filter((category) => category.isSour)
                  .map((category) => category.cat + category.subcat)
                  .filter(
                    (categoryString) =>
                      !Object.keys(total_unapproved).includes(categoryString)
                  ),
                completed: Math.min(sour_unapproved, rank.minSours),
                total: rank.minSours,
              },
            ]
          : []),
        ...(!!rank.minMixedSours
          ? [
              {
                description: `${rank.minMixedSours} styles ${rank.minScore}+ mixed-fermentation sours`,
                categories: categoryList
                  .filter((category) =>
                    mixedFermentationSours.includes(
                      category.cat + category.subcat
                    )
                  )
                  .map((category) => category.cat + category.subcat)
                  .filter(
                    (categoryString) =>
                      !Object.keys(total_unapproved).includes(categoryString)
                  ),
                completed: Math.min(mixed_sour_unapproved, rank.minMixedSours),
                total: rank.minMixedSours,
              },
            ]
          : []),
      ]
    : [];

  return {
    sheetsApproved,
    achieved,
    requirements,
  };
};
