if(!db){
    var db={}
};
db.oplv={
    "leveling":{
        "expTable":{
            "elite_0":[0,100,217,351,502,670,855,1057,1276,1512,1765,2035,2322,2626,2947,3285,3640,4012,4401,4807,5230,5670,6127,6601,7092,7600,8125,8667,9226,9800,10389,10994,11615,12252,12905,13574,14259,14960,15676,16400,17139,17888,18647,19417,20200,21004,21824,22660,23512,24400],
            "elite_1":[0,120,292,516,792,1120,1500,1932,2416,2952,3540,4180,4872,5616,6412,7260,8160,9112,10116,11172,12280,13440,14652,15916,17232,18600,20020,21492,23016,24592,26220,27926,29710,31572,33512,35530,37626,39800,42052,44382,46790,49374,52134,55070,58182,61470,64934,68574,72390,76382,80550,84894,89414,94110,99000,104326,110345,116657,123162,130000,137391,145048,152871,160960,169315,177936,186823,195976,205395,215000,224951,235399,246344,257786,269725,282161,295094,308524,322451,337000],
            "elite_2":[0,191,494,909,1436,2075,2826,3689,4664,5751,6950,8261,9684,11219,12866,14625,16496,18479,20574,22781,25100,27531,30074,32729,35496,38375,41366,44469,47684,51011,54450,58052,61817,65745,69836,74090,78507,83087,87830,92736,97805,103037,108432,113990,119711,125595,131642,137852,144225,150761,157460,164362,171467,178775,186286,194000,201917,210037,218360,226886,235615,244778,254375,264406,274871,285770,297103,308870,321071,333800,346869,360616,375041,390144,405925,422384,439521,457336,475829,495000,514849,535954,558315,581932,606805,632934,660319,688960,718857,750000]
        },
        "lmdTable":{
            "elite_0":[0,30,66,109,159,216,281,354,435,525,624,732,850,978,1116,1265,1425,1607,1813,2044,2302,2588,2903,3249,3627,4038,4484,4966,5486,6043,6638,7273,7950,8670,9434,10243,11099,12003,12955,13947,14989,16075,17206,18384,19613,20907,22260,23673,25147,26719],
            "elite_1":[0,48,119,214,334,480,653,854,1085,1347,1640,1966,2327,2723,3155,3625,4133,4681,5270,5901,6576,7295,8060,8871,9730,10638,11596,12606,13668,14784,15955,17200,18522,19922,21402,22964,24609,26340,28157,30063,32059,34230,36579,39110,41827,44734,47834,51132,54631,58336,62250,66377,70721,75286,80093,85387,91436,97849,104530,111628,119381,127497,135875,144627,153759,163277,173186,183492,194201,205228,216761,228985,241911,255550,269913,285010,300853,317452,334819,353122],
            "elite_2":[0,76,200,373,598,877,1211,1603,2054,2567,3144,3786,4496,5276,6127,7052,8053,9132,10291,11531,12855,14265,15763,17351,19031,20804,22673,24640,26707,28876,31149,33562,36118,38820,41671,44674,47832,51148,54625,58265,62072,66048,70197,74521,79023,83707,88575,93630,98875,104313,109947,115814,121917,128260,134847,141682,148768,156108,163707,171568,179695,188308,197416,207026,217146,227783,238946,250642,262880,275762,289105,303264,318252,334080,350761,368306,386728,406039,426252,447378,469470,493192,518572,545637,574415,604934,637221,671304,707210,744955]
        }
    },
    
    "elitePromotion":{
        "lmdTable":{
            "elite_0":[0,0,10000,15000,20000,30000],
            "elite_1":[0,0,0,60000,120000,180000]
        }
    },
    
    "maxLevel":{
        "elite_0":[30,30,40,45,50,50],
        "elite_1":[0,0,55,60,70,80],
        "elite_2":[0,0,0,70,80,90]
    },
    
    "expCard":{
        "tier_1":200,
        "tier_2":400,
        "tier_3":1000,
        "tier_4":2000
    },
    
    "stage":{
        "exp":{
            "LS-1":{
                "sanity":10,
                "reward":{
                    "lowerBound":1400,
                    "upperBound":1800,
                    "expectation":1600
                }
            },
            "LS-2":{
                "sanity":15,
                "reward":{
                    "lowerBound":2600,
                    "upperBound":3000,
                    "expectation":2800
                }
            },
            "LS-3":{
                "sanity":20,
                "reward":{
                    "lowerBound":3600,
                    "upperBound":4800,
                    "expectation":4200
                }
            },
            "LS-4":{
                "sanity":25,
                "reward":{
                    "lowerBound":3600,
                    "upperBound":7200,
                    "expectation":5400
                }
            },
            "LS-5":{
                "sanity":30,
                "reward":{
                    "lowerBound":7400,
                    "upperBound":7400,
                    "expectation":7400
                }
            },
            "LS-6":{
                "sanity":36,
                "reward":{
                    "lowerBound":10000,
                    "upperBound":10000,
                    "expectation":10000
                }
            }
        },
        
        "lmd":{
            "CE-1":{
                "sanity":10,
                "reward":{
                    "lowerBound":1700,
                    "upperBound":1700,
                    "expectation":1700
                }
            },
            "CE-2":{
                "sanity":15,
                "reward":{
                    "lowerBound":2800,
                    "upperBound":2800,
                    "expectation":2800
                }
            },
            "CE-3":{
                "sanity":20,
                "reward":{
                    "lowerBound":4100,
                    "upperBound":4100,
                    "expectation":4100
                }
            },
            "CE-4":{
                "sanity":25,
                "reward":{
                    "lowerBound":5700,
                    "upperBound":5700,
                    "expectation":5700
                }
            },
            "CE-5":{
                "sanity":30,
                "reward":{
                    "lowerBound":7500,
                    "upperBound":7500,
                    "expectation":7500
                }
            },
            "CE-6":{
                "sanity":36,
                "reward":{
                    "lowerBound":10000,
                    "upperBound":10000,
                    "expectation":10000
                }
            }
        }
    }
}