
const _ = import('lodash');
const { Hospital } = require("../models/hospital");

module.exports = function(log, hospitalId){
    const task = log.task;
    const hospital = Hospital.findById(hospitalId);

    let rvuValue;

    switch(!undefined){
        case log.rvuReq:
            rvuValue = log.rvuReq;
            break;
        case findCustom(log, hospital):
            break;
        case findDefault(log):
            
    }

    async function findCustom(log, hospital){
        const customValues = hospital.rvuSettings;
        
        return rvuValue = ( await _).find(customValues, (v) => { return v.name == log.task});
    }

}