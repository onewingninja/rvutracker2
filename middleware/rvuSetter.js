
const _ = import('lodash');
const fs = import('fs');
const { Hospital } = require("../models/hospital");
const logger = require('./logger');

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
            break;
        default:
            throw new Error("Error assigning rvu value to log");
    }

    log.rvu = rvuValue;

    async function findCustom(log, hospital){
        const customValues = hospital.rvuSettings;
        
        return rvuValue = ( await _).find(customValues, (v) => 
        { return v.name == log.task});
    }

    async function findDefault(log){
        fs.readFile('../templates/defaultRvuValues.json', 'utf8', (err, data) => {
            if(err){
                logger.error(err);
                throw err;
            }
            else{
                const defaultValues = JSON.parse(data)

                return rvuValue = ( await_).find(defaultValues, (v) => 
                { return v.name == log.task});
            }
        });
    }

}