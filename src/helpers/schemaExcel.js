exports.schema = {
    "N°":{
        prop:"num",
        type:Number
    },
    "NOM":{
        prop:"first_name",
        type: String
    },
    "PRENOM":{
        prop:"last_name",
        type: String
    },
    "DATE DE NAISSANCE":{
        prop:"date_of_birth",
        type: Date
    },
    "LIEU NAISSANCE":{
        prop:"place_of_birth",
        type: String
    },
    "SIT/F":{
        prop:"family_situation",
        type:String
    },
    "NOM CONJOINT":{
        prop:"c_first_name",
        type:String
    },
    "PRENOM CONJOINT":{
        prop:"c_last_name",
        type:String
    },
    "DATE ET LIEU NAISSANCE":{
        prop:"c_date_place",
        type:String
    },
    "FILS DE":{
        prop:"father",
        type:String
    },
    "ET DE":{
        prop:"mother",
        type: String
    },
    "ADRESSE":{
        prop:"adr",
        type: String
    }
}