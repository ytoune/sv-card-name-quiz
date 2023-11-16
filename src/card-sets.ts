import { sets as cardSets } from './gen/cards'

/**
 * https://shadowverse-portal.com/cards?format=1&lang=ja
 */
/*
tmp = [...document.querySelectorAll(".cards-cardset-box label")];
console.log(JSON.stringify(
tmp.map(t => [t.textContent.trim(), t.querySelector("[value]")?.value|0])
));
 */

/** カードセット, 90000 はトークン */
export type CardSetId = (typeof cardSets)[number][1] | 90000

export { cardSets }
