const { labAccess } = require('../models');
const { Op } = require("sequelize");
const ExcelJS = require('exceljs');
const moment = require('moment')

const store_access = async (req, res) => {

    const data = {
        student_id: req.body.student_id,
        lab_name: req.body.lab_name,
        entered_at: new Date()
    }
    try{
        const lab_access = await labAccess.create(data);
        return res.json({success: true, lab_access})
    } catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}


const get_distincet_labs = async (req, res, next) => {
    try{
        const data = await labAccess.aggregate('lab_name', 'DISTINCT', { plain: false});
        const labs = [];
        data.forEach((element, index) => {
            labs.push({
                id: index + 1,
                name: element.DISTINCT
            });
        });
        res.json({success: true, labs});
    } catch(err) {
        console.log(err);
        next(err);
    }
}

const download_excel = async (req, res, next) => {
    const lab_name = req.params.lab_name;
    try{
        //this code is for getting data from database
        const data = await labAccess.findAll({ where: generate_condition_object(lab_name, req.body) });

        //this code is for generating excel
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('lab_name');
        sheet.addRow(['id', 'student id', 'lab', 'entrance date']);
        data.forEach((item, index) => {
            sheet.addRow([
                index + 1,
                item.student_id,
                item.lab_name,
                item.entered_at
            ]);
        });

        //this code for download excel
        res.attachment(`${lab_name}.xlsx`);
        workbook.xlsx.write(res).then(() => {
            res.end();
        });
    } catch(error) {
        console.log(error)
        next(error)
    }
     
}

const generate_condition_object = (lab_name, data) => {
    let obj = {lab_name};

    if(data.from !== undefined && data.to !== undefined) {
        obj.entered_at = {
            [Op.gte]: moment.utc(data.from, "YYYY-MM-DD"),
            [Op.lte]: moment.utc(data.to, "YYYY-MM-DD").add(24, 'hours').subtract(1, 'minute').toDate()
        }
    } else if(data.from !== undefined && data.to === undefined) {
        obj.entered_at = {
            [Op.gte]: moment.utc(data.from, "YYYY-MM-DD"),
        }
    } else if(data.from === undefined && data.to !== undefined) {
        obj.entered_at = {
            [Op.lte]: moment.utc(data.to, "YYYY-MM-DD").add(24, 'hours').subtract(1, 'minute').toDate()
        }
    }
    return obj;
}

module.exports = {
    store_access,
    get_distincet_labs,
    download_excel
}