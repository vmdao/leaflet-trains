/* Global Google Map variables */
/* START Polylines */
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

//** START - POLYLINE STYLES **//
// complete network
var polyLineColor = "#949c30";
var polyLineWeight = 10;
var polyLineStrokeOpacity = 1;

// complete network with selected line
var lineAndNetworkLineColor = "#d01a6c";
var lineAndNetworkLineWeight = 10;
var lineAndNetworkLineStrokeOpacity = 0.5;

// selected lines
var selectedLineColor = "#007AB1";
var selectedLineWeight = 10;
var selectedLineStrokeOpacity = 1;
//** END - POLYLINE STYLES **//

//** START - GLOBAL "MAP" VARIABLE **//
var defaultStation = 'Flinders Street';
var networkStation;
var infowindow = new InfoBox(infoBoxOptions);
var map;
var bounds = null;
var myLatlng = new google.maps.LatLng(-37.813, 144.96);
var zoomLevel = 12;
var stationZoomLevel = 12;
var allMarkers = {};
var earliestDepartureTime = -1;
var latestDepartureTime = -1;
var timeFormatRegex = "(.+):(.+) (.+)";
var currentDirection=1;
var myLine = null;
var myStation = null;

var minTimeWindow = 20 * 60;

// cityloop is not a network line node, so we add here as default
var allLines = {
    'cityloopPath': {
        'latlng': myLatlng,
        'zoom': zoomLevel
    }
};
var currentTrainLines = [];
var trainLines = {
  'cityloopPath': [0],
  'alameinPath': [0, 1, 10, 12, 13],
  'belgravePath': [0, 1, 10, 12, 14, 15],
  'craigieburnPath': [0, 20, 22, 23],
  'cranbournePath': [0, 1, 2, 4, 7, 8],
  'frankstonPath': [0, 1, 2, 4, 5],
  'glenwaverleyPath': [0, 1, 10, 11],
  'glen waverleyPath': [0, 1, 10, 11],
  'hurstbridgePath': [0, 17, 18],
  'lilydalePath': [0, 1, 10, 12, 14, 16],
  'pakenhamPath': [0, 1, 2, 4, 7, 9],
  'sandringhamPath': [0, 1, 2, 3],
  'southmorangPath': [0, 17, 19],
  'stonypointPath': [6],
  'sunburyPath': [0, 20, 25, 26, 31],
  'upfieldPath': [0, 20, 21],
  'werribeePath': [0, 20, 25, 27, 29, 30],
  'williamstownPath': [0, 20, 25, 27, 28]
};


var network={
    'Alamein':['Alamein','Ashburton','Burwood','Hartwell','Willison','Riversdale','Camberwell','Auburn','Glenferrie','Hawthorn','Burnley','East Richmond','Richmond','Flinders Street','Southern Cross','Flagstaff','Melbourne Central','Parliament'],
    'Belgrave':['Belgrave','Tecoma','Upwey','Upper Ferntree Gully','Ferntree Gully','Boronia','Bayswater','Heathmont','Ringwood','Heatherdale','Mitcham','Nunawading','Blackburn','Laburnum','Box Hill','Mont Albert','Surrey Hills','Chatham','Canterbury','East Camberwell','Camberwell','Auburn','Glenferrie','Hawthorn','Burnley','East Richmond','Richmond','Flinders Street','Southern Cross','Flagstaff','Melbourne Central','Parliament'],
    'Craigieburn':['Craigieburn','Roxburgh','Coolaroo','Broadmeadows','Jacana','Glenroy','Oak Park','Pascoe Vale','Strathmore','Glenbervie','Essendon','Moonee Ponds','Ascot Vale','Newmarket','Kensington','North Melbourne','Flagstaff','Melbourne Central','Parliament','Flinders Street','Southern Cross'],
    'Cranbourne':['Cranbourne','Merinda Park','Lynbrook','Dandenong','Yarraman','Noble Park','Sandown Park','Springvale','Westall','Clayton','Huntingdale','Oakleigh','Hughesdale','Murrumbeena','Carnegie','Caulfield','Malvern','Armadale','Toorak','Hawksburn','South Yarra','Richmond','Flinders Street','Southern Cross','Flagstaff','Melbourne Central','Parliament'],
    'Frankston':['Frankston','Kananook','Seaford','Carrum','Bonbeach','Chelsea','Edithvale','Aspendale','Mordialloc','Parkdale','Mentone','Cheltenham','Southland','Highett','Moorabbin','Patterson','Bentleigh','McKinnon','Ormond','Glenhuntly','Caulfield','Malvern','Armadale','Toorak','Hawksburn','South Yarra','Richmond','Flinders Street','Southern Cross','Flagstaff','Melbourne Central','Parliament'],
    'Glen Waverley':['Glen Waverley','Syndal','Mount Waverley','Jordanville','Holmesglen','East Malvern','Darling','Glen Iris','Gardiner','Tooronga','Kooyong','Heyington','Burnley','East Richmond','Richmond','Flinders Street','Southern Cross','Flagstaff','Melbourne Central','Parliament'],
    'Hurstbridge':['Hurstbridge','Wattle Glen','Diamond Creek','Eltham','Montmorency','Greensborough','Watsonia','Macleod','Rosanna','Heidelberg','Eaglemont','Ivanhoe','Darebin','Alphington','Fairfield','Dennis','Westgarth','Clifton Hill','Victoria Park','Collingwood','North Richmond','West Richmond','Jolimont-MCG','Parliament','Melbourne Central','Flagstaff','Southern Cross','Flinders Street'],
    'Lilydale':['Lilydale','Mooroolbark','Croydon','Ringwood East','Ringwood','Heatherdale','Mitcham','Nunawading','Blackburn','Laburnum','Box Hill','Mont Albert','Surrey Hills','Chatham','Canterbury','East Camberwell','Camberwell','Auburn','Glenferrie','Hawthorn','Burnley','East Richmond','Richmond','Flinders Street','Southern Cross','Flagstaff','Melbourne Central','Parliament'],
    'Pakenham':['Pakenham','Cardinia Road','Officer','Beaconsfield','Berwick','Narre Warren','Hallam','Dandenong','Yarraman','Noble Park','Sandown Park','Springvale','Westall','Clayton','Huntingdale','Oakleigh','Hughesdale','Murrumbeena','Carnegie','Caulfield','Malvern','Armadale','Toorak','Hawksburn','South Yarra','Richmond','Flinders Street','Southern Cross','Flagstaff','Melbourne Central','Parliament'],
    'Sandringham':['Sandringham','Hampton','Brighton Beach','Middle Brighton','North Brighton','Gardenvale','Elsternwick','Ripponlea','Balaclava','Windsor','Prahran','South Yarra','Richmond','Flinders Street','Southern Cross','Flagstaff','Melbourne Central','Parliament'],
    'Mernda':['Mernda','Hawkstowe','Middle Gorge','South Morang','Epping','Lalor','Thomastown','Keon Park','Ruthven','Reservoir','Regent','Preston','Bell','Thornbury','Croxton','Northcote','Merri','Rushall','Clifton Hill','Victoria Park','Collingwood','North Richmond','West Richmond','Jolimont-MCG','Flinders Street','Southern Cross','Flagstaff','Melbourne Central','Parliament'],
    'Stony Point':['Stony Point','Crib Point','Morradoo','Bittern','Hastings','Tyabb','Somerville','Baxter','Leawarra','Frankston'],
    'Sunbury':['Sunbury','Diggers Rest','Watergardens','Keilor Plains','St Albans','Ginifer','Albion','Sunshine','Tottenham','West Footscray','Middle Footscray','Footscray','South Kensington','North Melbourne','Flagstaff','Melbourne Central','Parliament','Flinders Street','Southern Cross'],
    'Upfield':['Upfield','Gowrie','Fawkner','Merlynston','Batman','Coburg','Moreland','Anstey','Brunswick','Jewell','Royal Park','Flemington Bridge','Macaulay','Melbourne Central','North Melbourne','Flagstaff','Parliament','Flinders Street','Southern Cross'],
    'Werribee':['Werribee','Hoppers Crossing','Williams Landing','Aircraft','Laverton','Westona','Altona','Seaholme','Newport','Spotswood','Yarraville','Seddon','Footscray','South Kensington','North Melbourne','Flagstaff','Melbourne Central','Parliament','Southern Cross','Flinders Street'],
    'Williamstown':['Williamstown','Williamstown Beach','North Williamstown','Newport','Spotswood','Yarraville','Seddon','Footscray','South Kensington','North Melbourne','Flagstaff','Melbourne Central','Parliament','Southern Cross','Flinders Street']
};

var stations=['Aircraft','Alamein','Albion','Alphington','Altona','Anstey','Armadale','Ascot Vale','Ashburton','Aspendale','Auburn','Balaclava','Batman','Baxter','Bayswater','Beaconsfield','Belgrave','Bell','Bentleigh','Berwick','Bittern','Blackburn','Bonbeach','Boronia','Box Hill','Brighton Beach','Broadmeadows','Brunswick','Burnley','Burwood','Camberwell','Canterbury','Cardinia Road','Carnegie','Carrum','Caulfield','Chatham','Chelsea','Cheltenham','Southland','Clayton','Clifton Hill','Coburg','Collingwood','Coolaroo','Craigieburn','Cranbourne','Crib Point','Croxton','Croydon','Dandenong','Darebin','Darling','Dennis','Diamond Creek','Diggers Rest','Eaglemont','East Camberwell','East Malvern','East Richmond','Edithvale','Elsternwick','Eltham','Epping','Essendon','Fairfield','Fawkner','Ferntree Gully','Flagstaff','Flemington Bridge','Flinders Street','Footscray','Frankston','Gardenvale','Gardiner','Ginifer','Glen Iris','Glen Waverley','Glenbervie','Glenferrie','Glenhuntly','Glenroy','Gowrie','Greensborough','Hallam','Hampton','Hartwell','Hastings','Hawksburn','Hawkstowe','Hawthorn','Heatherdale','Heathmont','Heidelberg','Heyington','Highett','Holmesglen','Hoppers Crossing','Hughesdale','Huntingdale','Hurstbridge','Ivanhoe','Jacana','Jewell','Jolimont-MCG','Jordanville','Kananook','Keilor Plains','Kensington','Keon Park','Kooyong','Laburnum','Lalor','Laverton','Leawarra','Lilydale','Lynbrook','Macaulay','Macleod','Malvern','McKinnon','Melbourne Central','Mentone','Merinda Park','Merlynston','Mernda','Merri','Middle Brighton','Middle Footscray','Middle Gorge','Mitcham','Mont Albert','Montmorency','Moonee Ponds','Moorabbin','Mooroolbark','Mordialloc','Moreland','Morradoo','Mount Waverley','Murrumbeena','Narre Warren','Newmarket','Newport','Noble Park','North Brighton','North Melbourne','North Richmond','North Williamstown','Northcote','Nunawading','Oak Park','Oakleigh','Officer','Ormond','Pakenham','Parkdale','Parliament','Pascoe Vale','Patterson','Prahran','Preston','Regent','Reservoir','Richmond','Ringwood','Ringwood East','Ripponlea','Riversdale','Rosanna','Roxburgh','Royal Park','Rushall','Ruthven','Sandown Park','Sandringham','Seaford','Seaholme','Seddon','Somerville','South Kensington','South Morang','South Yarra','Southern Cross','Spotswood','Springvale','St Albans','Stony Point','Strathmore','Sunbury','Sunshine','Surrey Hills','Syndal','Tecoma','Thomastown','Thornbury','Toorak','Tooronga','Tottenham','Tyabb','Upfield','Upper Ferntree Gully','Upwey','Victoria Park','Watergardens','Watsonia','Wattle Glen','Werribee','West Footscray','West Richmond','Westall','Westgarth','Westona','Williams Landing','Williamstown','Williamstown Beach','Willison','Windsor','Yarraman','Yarraville'];


var cityLoopStations = ['Parliament','Melbourne Central','Flagstaff','Southern Cross','Flinders Street'];



function setMyLine(myLineIn)
{
    myLine = myLineIn;
    setCookieValue('myLine', myLine);
}

function setMyStation(myStationIn)
{
    myStation = myStationIn;
    setCookieValue('myStation', myStation);
}

function setCurrentDirection(currentDirectionIn)
{
    currentDirection = currentDirectionIn;
    setCookieValue('currentDirection', currentDirection);

}

function initMyLineStation()
{
    //myLine = getCookieValue('myLine');
    //myStation = getCookieValue('myStation');
    if(getCookieValue('currentDirection'))
    {
        //currentDirection = parseInt(getCookieValue('currentDirection'));
    }
    setTimeout(initMyLineStation, 1000 * 60 * 10 );
}

function amCookiePrefix()
{
    return "AM";
}

function pmCookiePrefix()
{
    return "PM";
}

function autoCookiePrefix()
{
    var date = new Date;
    var hour = date.getHours();
    if(hour < 12)
    {
        return amCookiePrefix();
    }
    return pmCookiePrefix();
}

function getCookieValue(name)
{
    var value = $.cookie('metro.' + autoCookiePrefix() + '.'+ name);
    if(!value)
    {
        value = $.cookie('metro.' + amCookiePrefix() + '.'+ name);
    }
    if(!value)
    {
        value = $.cookie('metro.' + pmCookiePrefix() + '.'+ name);
    }
    return value;
}

function setCookieValue(name, value)
{
    $.cookie('metro.' + autoCookiePrefix() + '.'+ name, value, { expires: 365, path: '/' });

}


var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

var dayNames = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];

//** END - GLOBAL "MAP" VARIABLE **//

MTM_MAP_STYLES = [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [{"visibility": "on"}, {"color": "#e0efef"}]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [{"visibility": "on"}, {"hue": "#1900ff"}, {"color": "#c0e8e8"}]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{"lightness": 100}, {"visibility": "simplified"}]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{"visibility": "on"}, {"lightness": 700}]
    },
    {
        "featureType": "water", "elementType": "all", "stylers": [{"color": "#7dcdcd"}]
    }];

plannedWorksClassifications = [
    'maintenance',
    'level-crossing',
    'urgent-works',
    'station-works',
    'project-works'
];

plannedWorksClassificationsPriorty = {
    'maintenance':2,
    'level-crossing':1,
    'urgent-works':0,
    'station-works':3,
    'project-works':4
};

plannedWorksClassificationNames = {
    'maintenance':'Maintenance',
    'level-crossing':'Level Crossing',
    'urgent-works':'Urgent Works',
    'station-works':'Station Works',
    'project-works':'Project Works'
};

plannedWorksColors = {
    'maintenance':'#0073CF',
        'level-crossing':'#E01414',
        'urgent-works':'#E17000',
    'station-works':'#77216F',
    'project-works':'#c313a9'
};