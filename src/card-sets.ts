/*
tmp = [...document.querySelectorAll(".cards-cardset-box label")];
console.log(JSON.stringify(
tmp.map(t => [t.textContent.trim(), t.querySelector("[value]")?.value|0])
));
 */

/** カードセット, 90000 はトークン */
export type CardSetId = typeof cardSets[number][1] | 90000

export const cardSets = [
	['天象の楽土', 10024],
	['十禍闘争', 10023],
	['災禍を超えし者', 10022],
	['リナセント・クロニクル', 10021],
	['暗黒のウェルサ', 10020],
	['十天覚醒', 10019],
	['レヴィールの旋風', 10018],
	['運命の神々', 10017],
	['ナテラ崩壊', 10016],
	['アルティメットコロシアム', 10015],
	['森羅咆哮', 10014],
	['リバース・オブ・グローリー', 10013],
	['鋼鉄の反逆者', 10012],
	['次元歪曲', 10011],
	['十禍絶傑', 10010],
	['蒼空の騎士', 10009],
	['起源の光、終焉の闇', 10008],
	['時空転生', 10007],
	['星神の伝説', 10006],
	['ワンダーランド・ドリームズ', 10005],
	['神々の騒嵐', 10004],
	['バハムート降臨', 10003],
	['ダークネス・エボルヴ', 10002],
	['クラシックカードパック', 10001],
	['ベーシックカード', 10000],
	['構築済みデッキ 第1弾', 70001],
	['構築済みデッキ 第2弾', 70002],
	['アニゲラコラボ', 70003],
	['劇場版Fate[HF]コラボ', 70004],
	['構築済みデッキ 第4弾', 70005],
	['構築済みデッキ 第5弾', 70006],
	['プリンセスコネクト！Re:Diveコラボ', 70008],
	['ワンパンマンコラボ', 70009],
	['Re:ゼロから始める異世界生活コラボ', 70010],
	['構築済みデッキ 第6弾', 70011],
	['ラブライブ！スクールアイドルフェスティバルコラボ', 70012],
	['涼宮ハルヒの憂鬱コラボ', 70013],
	['構築済みデッキ 第7弾', 70014],
	['NieR:Automataコラボ', 70016],
	['コードギアス 反逆のルルーシュコラボ', 70017],
	['シャドウバース チャンピオンズバトルコラボ', 70018],
	['シャドウバース チャンピオンズバトルセット', 70019],
	['グランブルーファンタジーコラボ', 70020],
	['バトルパス', 70021],
	['かぐや様は告らせたい？コラボ', 70022],
	['アイドルマスター シンデレラガールズコラボ', 70023],
	['SHAMAN KINGコラボ', 70024],
	['ウマ娘 プリティーダービーコラボ', 70025],
] as const
