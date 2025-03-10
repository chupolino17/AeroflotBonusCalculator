AERFLOT_FARES_DICT_TO_ID = {
    'business-premium': 1,
    'business-optimum': 2,
    'business-base': 3,
    'economy-premium': 4,
    'economy-smart-flex': 5,
    'economy-optimum': 6,
    'economy-smart-classic': 7,
    'economy-budget': 8,
    'economy-lite': 9,
    'economy-smart-lite': 10,
    'economy-SHTL': 11
}

AERFLOT_FARES_ID_TO_DICT = dict((v, k) for k, v in AERFLOT_FARES_DICT_TO_ID.items())

BGO_FARES_DICT_TO_ID = {
    'Business Base': 3,
    'Business Classic': 2,
    'Business Flex': 1,
    'Economy Flex': 4,
    'Economy Lite': 10,
    'Economy Shuttle': 11,
    'Economy Classic': 6,
    'Эконом': 10
}

BGO_FARES_ID_TO_DICT = dict((v, k) for k, v in BGO_FARES_DICT_TO_ID.items())