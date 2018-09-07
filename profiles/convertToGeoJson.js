const polyline = require('polyline');
const fs = require('fs');
const GeoJSON = require('geojson');

var encodedPaths = new Array();
encodedPaths[0] = new Array();
encodedPaths[0][0] = "CityloopPath";
encodedPaths[0][1] = "~gyeFw~xsZtTrjADfA?|@]|Ao@z@mb@lXo@?cAOcAk@eAoAw@uAkAiCg@eB]}AcDyP_FcXoF}X_CiMgAcEk@}CWwBEqC@q@VkBTiA^y@nBgDvA{AxAcAbAk@v@c@`FaBh@SpNgFTEh@Cr@?h@Dr@RbAbAXv@pHje@";
encodedPaths[1] = new Array();
encodedPaths[1][0] = "CityloopRichmondPath";
encodedPaths[1][1] = "lnzeFyh}sZaBbJmBdLqCzKqEpJ_C`EqExJeGvLgA`CcAzAmCtC{@hA]v@GTEb@?\\";
encodedPaths[2] = new Array();
encodedPaths[2][0] = "RichmondSouthYarraPath";
encodedPaths[2][1] = "|h}eF_y}sZmM{Awk@gGiBQaBJ}AVaBb@uAp@gBxAuChEkAvBcBlEyAvC";
encodedPaths[3] = new Array();
encodedPaths[3][0] = "SouthYarraSandringhamPath";
encodedPaths[3][1] = "vdsfFme`tZg_@eEgDSaDBgCXgCl@sAf@yBrAuBbBaVnX}OdR_GpNi@fAs@x@aLjK}K~J_Ah@oAf@q@PsAN_CAeCc@cA]{b@uTmNkHyAy@uC{ByWe[qC}BuBmAaCcA{Bs@gCa@yNeBgHs@ke@iFk\\kDaAGiCAaFXuG`AyCt@{EpB_EdC_f@|[gGxDkH`Dmb@rPqBb@oCTsCIuGm@_Fm@mWmC}LkAsE[mCXwCh@aA^cFpCeCdBw@l@y@z@iBtBoE~Fw@f@}DvBcCz@eATkCPiCAeF]mEa@oLoA}p@kI{CcA";
encodedPaths[4] = new Array();
encodedPaths[4][0] = "SouthYarraCaulfieldPath";
encodedPaths[4][1] = "`|dfFmpgtZmB~CiEnGaDtDkK~Lkp@xu@{PtRsR`R}NdM{@v@{@hA_GpGcX`WuD|DgDdEuBtCoCtG_CtImGfVcHbVuHdUyDvMcA~D{@jBmA~@{AbAaBXkBTiCU";
encodedPaths[5] = new Array();
encodedPaths[5][0] = "CaulfieldFrankstonPath";
encodedPaths[5][1] = "`|dfFmpgtZ~JsP~AaB~BuAzBs@lBYfDGxBZxA`@p@XpCtBfKdKxBnAfBn@dCf@fFj@nEj@va@nEdS|B|M`B`AVdANtLbAlg@bF|^dEzx@vI|BXdDFzCa@~Bg@vFsBhJyCxBMdCDtCT`KrArEPrJDnESzEy@nGgBdNyGrlB}jAx^uT~e@uZ~c@_YxYoQvX_UpMwOfVoZnX_[ni@i]|LuHhR{KnQ{KnOgJjMqJxO_LhXsQxs@g^pr@}\\vT{Kl_@{O|W}JrTqGlPaEzKeBvPmA~OuApG{@jSeEvR}CpMiBfH}@nFcAvH}ApF{BlEmAf^mN~D{@tEa@bMUrTGrc@?|SGnE?pG}ArYeTjPyM`FsD|D}AtDm@pFI|FpAlb@hNdSlG`V|HlPvFjTfHnVrI";
encodedPaths[6] = new Array();
encodedPaths[6][0] = "FrankstonStonypointPath";
encodedPaths[6][1] = "xzxgF}{wtZ`Cv@zDz@pAPxDIbAQfA_@hAo@dBwAvBuCbAsB^wAn@cDxLes@|H_d@|AoFvDqHhNoT`MiSlBkDpAsDfBmLvEy_@fBuM\\sAzAgEt@cAlByB`DsBhC}@bD_@nF\\hF|@ba@lGjMvBj]fF`aBlWbMr@dGs@f[cLxa@yUpi@o\\|l@s^z_@gUnMaGfk@{@xbAY|HGbFgB|HaDrw@yg@vEeB~ZQb}@nB|m@jDfs@~Itp@`@ti@Gl[QdEr@~FrBpN`GxDfAfFv@|YCvMF|I?hHvB|NbJzWzPjFrDfCbAnCv@xBPjCBzCeA|IeIzRmTfLoMvHyInNyOfJwJxUoXpb@cg@dRkd@pG_X`BeIhAeDfBaEbBuC`B{B`BcDzB}C|AiC|AoFpAsD";
encodedPaths[7] = new Array();
encodedPaths[7][0] = "CaulfieldDandenongPath";
encodedPaths[7][1] = "`|dfFmpgtZfJqOhNqWbCsFtD}JvEsLjIqT~Ko\\rC}HhNia@lDiKjXww@jMk^`JcO`f@as@fYeb@ltB}yCb`@mj@jT}[bTm[d^ah@th@gv@f]yf@xZid@~Vk^rU{\\xY}b@rXib@`\\gi@dZ_f@lIuNjC}Gp@uBj@aB";
encodedPaths[8] = new Array();
encodedPaths[8][0] = "DandenongCranbournePath";
encodedPaths[8][1] = "b}zfFehhuZ~F_Qx@eBl@{@v@w@|@m@~AaAzDuBtGuDdHoEfDeDjB}B`CkElCiHlAwD~AoCxAoB`CkBlImC~DaBlOqEjUaIpm@oSxg@cQ`o@aTla@mN~b@mPdk@yTf^_Ops@gYdMkFx[eTf\\qUbVcPbo@sc@zn@wc@bReNbMuRdAsB";
encodedPaths[9] = new Array();
encodedPaths[9][0] = "DandenongPakenhamPath";
encodedPaths[9][1] = "b}zfFehhuZ~F_Qx@eBl@{@v@w@|@m@~AaAzDuBtGuDdHoEfDeDjB}B`CkElCiHlAwDneAs{CrUip@pB{GxBmIdBoIn@eIzDcq@bHwhA~Bmf@~EaRfDyJnDeItSwg@hDqJdHqPbMm[tTq|Ap@sGt@gLxDi|@j@}Ed@qChEwMzCiE~BqCjMwKxN{KhHwIdDsHlEcOfCaIv@cEtA_FtAsFjEiRrFuUrCyJpBmIhDgJdCmElCcD|LsOhHoJtGqJnEkLfC}Shv@eyGjaA__J";
encodedPaths[10] = new Array();
encodedPaths[10][0] = "RichmondBurnleyPath";
encodedPaths[10][1] = "lnzeFyh}sZd@}CTcAXaAZy@`@s@~BeD`@_Ar@mAh@iBTgATsAVeD`Cua@nB{_@HkB@_B";
encodedPaths[11] = new Array();
encodedPaths[11][0] = "BurnleyGlenwaverlyPath";
encodedPaths[11][1] = "be{eFiv`tZ`A{QNgEKoE_@kIEiGLkK^sC^eBh@gBt@iAx@m@|AeA|BcApC{@lCo@|IiCrA{@xBgAvAiAxBuCpAoArAcBnD{BvAgAfCcB`BcCfAwBbAaE`@gF\\kJt@yLt@wD~BmH~CmEtAoAvAw@rEsB|BqAhKiEnF_CfIaGdDmEbFoMvCeMbAcDrAeGlA{FbEiP|@{BfAsBjAyAxKsIdEmCvC{BhFyCdM{E~Bi@rOaDtEmAfIkFvF_FjEaDzBeApL_EpCs@~BqA~AgAhAcAtAkBvAyB~@iB|AyEh@}B^qBTeCBaCE_Bi@cN[cOMyDy@uOaDmTeGw_@wAyPgAuXeD}hA@yBBiAZkDbAaH`@uAdCoKl@{Cb@wCf@}Gl@cQP{YMsbBpDcl@|Bm\\|Pw_A";
encodedPaths[12] = new Array();
encodedPaths[12][0] = "BurnleyCamberwellPath";
encodedPaths[12][1] = "be{eFiv`tZt@oMJcHE_CO_Di@gEiCuJkPs\\sIoMyAwB}@uAgAoBaBoFYgBGkC?kD^mET}B|@kPR_FVsK?wBNiBP{CRmCHuCV_E|@_Qt@kO\\iI`@qGt@gF`@gFZmCNmB`@sB~@uC~AmCzEqEzA{Ct@aBbAgFNuCDmG";
encodedPaths[13] = new Array();
encodedPaths[13][0] = "CamberwellAlameinPath";
encodedPaths[13][1] = "p_{eFcyjtZGoEc@}SK{Jo@mIIsBD_ATiBf@eBZq@f@{@z@y@r@a@r@Yt@QdAIdA@lFb@jF\\lBRpK`AnAGbAU|@Wv@]xv@kb@|o@k_@fJ{EzF}CtB{@xBi@`CUrDEbBPzA^nJ|CzOxEdH|BxWfC";
encodedPaths[14] = new Array();
encodedPaths[14][0] = "CamberwellRingwoodPath";
encodedPaths[14][1] = "p_{eFcyjtZGoEc@}SK{Jo@mIgAwHMkAUeCK{BG_DVeIBqBb@cP?}HGuCoAkFcBcFyAeE{AoFy@}EMwEFgCXkDn@uEf@qEtAmNt@yILkFBuD]uEg@kFcAaFaAcDk[si@eAaBeAeDs@kFMyDWiY\\iQdCa_@v@wJxJ_hA|@oMEqE_@cDaAeD{AkDoAeDc@eC]eDKyBb@{LVuDJyDB{CAmKL_J|@sPl@eHhEop@F}HWuFu@_LoBoWmGat@kHs|@aAcOAaDfBmi@jAw`@|@i\\cAyi@m@wN[uEuAyJoFwQyB_H_HwR";
encodedPaths[15] = new Array();
encodedPaths[15][0] = "RingwoodBelgraveDecodedPath";
encodedPaths[15][1] = "xsxeFqsluZ_@gCSeDFqCRkCb@}B~@qCzAsCdCmCfAs@dOuGfJeErB{@pDaBbPeHdFuBlJmE|KoGpDeCdFwFv@cClAgFnAwKxBySbEe_@`@sC`AwDr@mBz@sA`Y_X`|@}y@pk@wh@zXuKl^sKdKsBtGeBdD_BpDgCzLmJhDaBlOqGfKaE|M}FvZ}LzIeDtC{AvB}AlBiBlAoBfEsIzDcLlD}LbAaITcFA{DVcDMiMHkBf@qChAeBdCwBlBuAxBwCvByEfEiIzGeNtF{K`A}Ct@oBf@oBp@gA~CgHt@kB|@eDz@aC`BcC`DsEvAgChBaEdBoE\\iBJqAR_FRcB^iAjCgGvAuDX_B\\cFVeCp@kBr@eBn@cAp@_Aj@_An@oAVsA?y@lAkS`@eEToBXmB`AsBp@}Ax@cDP{BBkBQ_BSgAe@mA";
encodedPaths[16] = new Array();
encodedPaths[16][0] = "RingwoodLilydaleDecodedPath";
encodedPaths[16][1] = "xsxeFqsluZsAeEc@kB_@sCGiBFiEh@wKXyHBaKe@iG_AaGkBkJeEsTqBcLcDgOsJog@oFsXiBoHwFgLmLaRyBwBgC{BkNkIiF{DcEeGsOm[gN}Y}BeEoEwFoBcBuGcEuB_BeDcEaCoIq@oDkCoJgPms@a@yCIsDRoEzC}L~AoHj@gDVkD?gEWyDe@aOu@aEuUae@aB_CyIkIwH_JeUyj@}AaCoD_CaNiCcSyC}CuAwCoDkGmGiTeVuNgOyFgHqCwC";
encodedPaths[17] = new Array();
encodedPaths[17][0] = "ParliamentCliftonhillPath";
encodedPaths[17][1] = "tbxeF}`zsZpEuDdCyArBcAnBs@jAcAxAuEf@sB^eCf@gFPsF^iGPwF`AkQT}FHiC[aFo@qCc@uAwCiEgBuAyA{@uD_AcV{ByFs@u@QeBq@_ToBkN_BaEHcAC}LeAg\\aDeB?gHh@sCFkAC_Ge@iDa@gL}@";
encodedPaths[18] = new Array();
encodedPaths[18][0] = "CliftonhillHurstbridgePath";
encodedPaths[18][1] = "xdseFon~sZkCcA_MsG{IeE}DwBcDsCoA_C{@wCa@cGGoGB}oACgm@CqOMeIY{DwBsK{H_]u@oBgB_DiDuCe]_YcBuCoAgD}GqVeHkK}GkLmCyDsFiIqDsDkDiCcF{DcCeCoI_LcHeK_F{GgGyI_CqCmBeA{CcAsDe@wFQwOs@sDG}OhCmM`BqSbAmFKcEa@oW{IuJuCwKiC{GUiD]cFm@gEa@_FyAwCkBmC{BwBaEoDkJgEuJuCsDyBkBaGqEyBiB{AyByByEmDaEgB{BaSeRaQeT_CeBoN}HaG_EyL}MgByCkAiC]{B]sDNsDn@wDlAcDnBgLj@}ArA{ClB}C|AyC`AiCj@oBv@{BdB}CjAqAjDgDrByA`BcAtCsBxBuAhBeCnDoD`CuCrCcCrLsIhJsHbA_Ax@uAp@_Bn@iBj@uCZ{G\\}Cf@gDhE{Rb@uC`@eDFsD_@iJu@}Cq@}DaH}P_@eEDsD`@aDhAmC~AmCdD{Gt@_EDqEc@mEuAyJm@oDuA_DcCmB_MsGkCgAuB]{HGgEBqEM}BcAeB}AiBmCwEwG}J{OsCkBoE{@}ACyEv@sBtAsI|HoBjAgBf@}B?kCo@kLmGoUsK{C_AyDC}DJ_D\\wAv@eBfBgGbH_E|EqElCaD~@}Bb@oEQmCw@yBiAsBeBaB_CcBcBwCoDkBqCmAcCsBuEcAoDu@eEa@}D[{Da@}L]gD_BeGyBwDwAqC}@_CeAwEcAaFo@aEsByJwA_H}A}GgCeN{AwDqAwBwAkDcAgAaG}BuCm@uIwBuCo@wBo@uB{@oB_CaBoDcBiCgBiBiEqCyFaC_RmG{HaB{Ds@qCd@oDCaC{@iCGsCPcCBmC]uEmCoCw@yB?qCXqCC}Bg@gCmBsAuA";
encodedPaths[19] = new Array();
encodedPaths[19][0] = "CliftonhillSouthmorangPath";
encodedPaths[19][1] = "xdseFon~sZqBRu@\\_BdAeAlAoIfNuB`DaAfAoApAwABcAKeAw@}DgFwBmA{Ci@mLcB{JgAyLcBeH_CeDaBuEcBqHmBwOwBih@cFua@sD{XqCcTkBwCGyBd@kHd@cC?kIoAkZ}DcGs@wl@eIsTgCmDs@kGaBk`@yQoNoDuOuAyNiBaa@yD{SiBsBg@mEu@gYeCuIYkOqAeWcCcJiAqCi@qFs@eMuA{KcAkUkBkOuAuIgAaEs@oG}AuQgDoIuCsG{DeFiEcFuEyQeRkDeE_EwFmCkF}AaEs@aMg@mu@cAah@w@iRcBoXaCw\\{Cq`@qAiV";
encodedPaths[20] = new Array();
encodedPaths[20][0] = "CityloopNorthmelbournePath";
encodedPaths[20][1] = "buxeFaqusZkS~[aTbPyEhDgPxLmFpK";
encodedPaths[21] = new Array();
encodedPaths[21][0] = "NorthmelbourneUpfieldPath";
encodedPaths[21][1] = "dlveFgcssZcLrAoGhAqIpAoDp@uCPuDFkEY_Fa@aJ}@q@UiAQmC_AeB{@{CiDwCmEsDeKaC}FcAwBsE_HkDwDoDuDaCwCqBkDcAkCs@iCw@wFOmECeEIoFe@yEmAaEkBkDeBwBiCaAeBk@wU{CcHm@}Ki@kUqA{Gc@yg@gFwLqA{J_Ac{AgJy^`BgRv@sXfByc@jCkStAqZjBk_@vBgf@xC_\\fBiVdBmKhCiMvDaYvCyIbAcD`@aCj@cF~B_NbK_IhDi^nKkJlCoK`DkSzFiCp@";
encodedPaths[22] = new Array();
encodedPaths[22][0] = "NorthmelbourneNewmarketPath";
encodedPaths[22][1] = "dlveFgcssZmE|JeBlEoAfCwBpCkEtC{GzBcVtFwHpAs`@|FyF`A";
encodedPaths[23] = new Array();
encodedPaths[23][0] = "NewmarketCragieburnPath";
encodedPaths[23][1] = "vbseFgkqsZqCTsCj@yDl@yBl@kG~BuBnAuG~EqR~PaFhDyBlAoDnAqEjA{L`BqSjC}Fx@cCj@oBp@kDrA}KxFoC~@mEv@{El@cEXmPHuCC}A[sO{D}CgAcBq@aAm@wCqBuDaDuDqEoCaF_F}M}BeG}BeEuC}DiDyC}CiBcAa@eAa@kCq@oC]}CQ}BFkEZ}b@bEkJlAqEdAkHnCgGfDyLxH{KtGyAv@yAj@kExAoVvFs]xH{z@bRgDl@aC\\cBPoFNwFCiIQ}Mk@kRaAgHe@gCYmDw@sC_A_LsH_EoD{HgFqHmEqDqAaFqAmM_BgUkCsKsAqJeAmJkA_LkAgLsAgLwAwDm@sFkB{ImEeEaC{OuIeR_K}EgCmCaAuEqAeIkA{tAiP{}@sK}w@qJuk@eHwAYiBc@}Ae@gAa@";
encodedPaths[24] = new Array();
encodedPaths[24][0] = "NewmarketFlemingtonracecousePath";
encodedPaths[24][1] = "vbseFgkqsZiAf@_Aj@qApAu@z@s@lAg@lA_ApCS~@MfAShDC`BGxLe@nn@G|CH`CTpBd@dCn@xBrAlCnBzBjAbAvAn@vCbCzFvH";
encodedPaths[25] = new Array();
encodedPaths[25][0] = "NorthmelbourneFootscrayPath";
encodedPaths[25][1] = "dlveFgcssZgElKyAvDa@nAk@jCe@hDgBfJeBrRsHt}@o@pIw@rO?zA^jMJvAb@|DzBnLrClI~FnM";
encodedPaths[26] = new Array();
encodedPaths[26][0] = "FootsrayWatergardensPath";
encodedPaths[26][1] = "d_veFwklsZbCtFhAdDh@`Cj@dFdAbSF`Hg@hKs@~MwCfi@cAhQ{AhYqClf@gA~FcDrj@yEn}@sDtl@wCtOqCdI{CpGeFxH_N`M{RnMmDjCk[lUoa@pYiQ~K{]jVax@|i@is@nf@_x@pi@uDfBuG~B{a@bJej@jLcJvBiNrFmMrH{NrKkPlLqY`Twg@v^uYdT";
encodedPaths[27] = new Array();
encodedPaths[27][0] = "FootscrayNewportPath";
encodedPaths[27][1] = "d_veFwklsZlQhPjOdNdKnJ`\\bZpC|BtCpBpCtApChAlCx@~A^|SbDbV|DhU~D|N|B`^zFvF~@`IzA|Ix@dEVfEC~CI";
encodedPaths[28] = new Array();
encodedPaths[28][0] = "NewportWilliamstownPath";
encodedPaths[28][1] = "rd~eFmqhsZtI_@zG{@zB]hDm@f@OxYeKr^iNdTsIrGiEvE_FnDaGt@}AhAsCfHkY`Lmf@";
encodedPaths[29] = new Array();
encodedPaths[29][0] = "NewportWerribeePath";
encodedPaths[29][1] = "rd~eFmqhsZLB`DPdD\\lBj@pAn@rBdBbB~Br@vAXz@`Npk@P|CFtB@vBCvAWzE}Bfa@kAfQuA~UyAnUiAvXc@bH}@rPGtAQnBEjDAlED~Fh@xIh@rGlKzp@~Hpd@|CjPtB`MdOzaAx`@jeCpIdj@|Iri@lCjQdMfx@|Nf|@tDvYhBxIhApHxCnQ|Fd\\`ChPtFl\\jIvg@nFz]nGt_@~BtLbC~IjKh]tN~e@jThs@tU|v@pNxd@hN|d@zSts@p@xA";
encodedPaths[30] = new Array();
encodedPaths[30][0] = "NewportSeaholmePath";
encodedPaths[30][1] = "rd_fFcrcsZC`I`@dEfAtCtBfC|DbBhCXjR~DhKlCxGjFdCjBhHt@|Ib@~Cv@tBnAfC`CbBbCtA|AnBbDzCxEdCjDdBpCnBjDlArD~@dE\\vDFnDkCpo@mAjSoCbk@u@jMMjA]pA_@|AW~C{@tNe@bLEvDInC{Dlj@iApPcApNqCpa@_AxLmAzQkAvOUxE@lAJ|CHlBHdAAv@";
encodedPaths[31] = new Array();
encodedPaths[31][0] = "WatergardensSunburyPath";
encodedPaths[31][1] = "lmbeFkbsrZ{zK``Ie]tIkmAlPygC}Ama@_J_cAmq@";
/* END Polylines */

var collection = encodedPaths.map((path, index) => {
    const line = polyline.decode(path[1]);
    const convertGeoJsonStand = line.map(l => l.reverse());
    return { name: path[0], id: index + 1, line: convertGeoJsonStand }
})

const geoCollection = GeoJSON.parse(collection, { 'Point': ['x', 'y'], 'LineString': 'line', 'Polygon': 'polygon', include: ['name', 'id'] });

geoCollection.features.forEach((f, index) => Object.assign(f, { id: index + 1 }))
fs.writeFile('./metrotrains.geojson', JSON.stringify(geoCollection), (error => {
    console.log('error', error)
}));