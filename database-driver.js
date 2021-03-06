/* 
This file has dependencies on;
    - sequelize (npm install --save this._sequelize)
    - mariadb (npm install --save mariadb)

This file establishes database access for the eHealthy database and its 53 stored procedures.

Note: Best practise would be to not include the username/host/password in the file and has been 
      included to allow ease of use.

How to use this file:
 - OpenConnection() MUST be called.
 - When closing the server, you MUST call CloseConnection();
 - It is expected that parameters prepended with;
           - int, are whole numbers
           - str, are strings. no longer than 255 characters
           - bool, are either the numerical value 0 or 1
           - date, are SQL compatable date strings eg. (2009-10-04 22:23:00) or yyyy-MM-dd hh:mm:ss
 - All methods return a promise, it is expected that the .then() and .catch()
   handlers are added within the business logic.
*/

const Sequelize = require('sequelize');

module.exports = function () {

    this.HasEstablishedConnection = false;
    this._sequelize = new Sequelize('ehealth', 'hamza', 'hamza12345', {
        host: 'ehealth.camtsfvgedtu.us-west-2.rds.amazonaws.com',
        port: 3306,
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-3',
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false
        },
        benchmark: false,
        logging: false
    });

// Returns a promise after creating the connection to the database
    this.OpenConnection = function () {
        if (HasEstablishedConnection) {
            console.log('Attempt to open connection aborted because connection has already been made');
            return;
        }

        return this._sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    };

    this.CloseConnection = function () {
        this._sequelize.close()
    };

    // this.ArchiveHealthNotification = function (int_updateID) {
    //     return this._sequelize.query(`CALL ArchiveHealthNotification (${int_updateID})`);
    // };
    // this.AssignPatientToGP = function (int_patientID, int_gpID) {
    //     return this._sequelize.query(`CALL AssignPatientToGP (${int_patientID} ${int_gpID})`);
    // };
    // this.ComparePassword = function (str_hash, str_email) {
    //     return this._sequelize.query(`CALL ComparePassword ('${str_hash}', '${str_email}')`);
    // };
    // this.DeleteAccount = function (int_deleteID) {
    //     return this._sequelize.query(`CALL DeleteAccount (${int_deleteID})`);
    // };
    // this.DeleteAccountRoles = function (int_deleteAccountID, int_deleteRolesID) {
    //     return this._sequelize.query(`CALL DeleteAccountRoles (${int_deleteAccountID}; ${int_deleteRolesID})`);
    // };
    // this.DeleteGPRoleFromAccount = function (int_accountID) {
    //     return this._sequelize.query(`CALL DeleteGPRoleFromAccount (${int_accountID})`);
    // };
    // this.DeleteGraph = function (int_deleteID) {
    //     return this._sequelize.query(`CALL DeleteGraph (${int_deleteID})`);
    // };
    // this.DeleteGraphType = function (int_deleteID) {
    //     return this._sequelize.query(`CALL DeleteGraphType (${int_deleteID})`);
    // };
    // this.DeleteHealthNotification = function (int_deleteID) {
    //     return this._sequelize.query(`CALL DeleteHealthNotification (${int_deleteID})`);
    // };
    // this.DeleteMeasurementType = function (int_deleteID) {
    //     return this._sequelize.query(`CALL DeleteMeasurementType (${int_deleteID})`);
    // };
    // this.DeleteMeasurements = function (int_deleteID) {
    //     return this._sequelize.query(`CALL DeleteMeasurements (${int_deleteID})`);
    // };
    // this.DeletePassword = function (int_deleteID) {
    //     return this._sequelize.query(`CALL DeletePassword (${int_deleteID})`);
    // };
    // this.DeletePatientRoleFromAccount = function (int_accountID) {
    //     return this._sequelize.query(`CALL DeletePatientRoleFromAccount (${int_accountID})`);
    // };
    // this.DeleteRoles = function (int_deleteID) {
    //     return this._sequelize.query(`CALL DeleteRoles (${int_deleteID})`);
    // };
    // this.DeleteScheduler = function (int_deleteID) {
    //     return this._sequelize.query(`CALL DeleteScheduler (${int_deleteID})`);
    // };
    this.InsertAccount = async function (str_username, str_password, str_role, str_gpId, str_name, str_email, str_phone, date_dob) {
        return await this._sequelize.query(`CALL InsertAccount ('${str_username}', '${str_password}', '${str_role}', '${str_gpId}',
         '${str_name}', '${str_email}', '${str_phone}', '${date_dob}')`);
    };
    // this.InsertGraph = function (str_insertTitle, int_insertGraphTypeID, int_insertHealthNotificationID) {
    //     return this._sequelize.query(`CALL InsertGraph ('${str_insertTitle}', ${int_insertGraphTypeID}; ${int_insertHealthNotificationID})`);
    // };
    // this.InsertGraphType = function (str_insertType) {
    //     return this._sequelize.query(`CALL InsertGraphType ('${str_insertType}')`);
    // };
    // this.InsertHealthNotification = function (int_accountID, date_startDatetime, date_endDatetime, int_measurementTypeID) {
    //     return this._sequelize.query(`CALL InsertHealthNotification (${int_accountID}; '${date_startDatetime}', '${date_endDatetime}', ${int_measurementTypeID})`);
    // };
    this.InsertMeasurementFromFitBit = async function (int_accountID, str_reading, str_measurementType, date_time) {
        return await this._sequelize.query(`CALL InsertMeasurementFromFitBit (${int_accountID}, '${str_reading}', '${str_measurementType}', '${date_time}')`);
    };
    this.InsertMeasurements = async function (int_accountID, str_reading, str_measurementType, date_time) {
        return await this._sequelize.query(`CALL InsertMeasurements (${int_accountID}, '${str_reading}', '${str_measurementType}', '${date_time}')`);
    };
    this.InsertRoles = async function (int_accountID, str_reading, str_measurementType, date_time) {
        return await this._sequelize.query(`CALL InsertRoles (${int_accountID}, '${str_reading}', '${str_measurementType}', '${date_time}')`);
    };
    // this.InsertScheduler = function (date_insertPredictionTimePeriodtime, date_insertSyncTimePeriodtime) {
    //     return this._sequelize.query(`CALL InsertScheduler ('${date_insertPredictionTimePeriodtime}', '${date_insertSyncTimePeriodtime}')`);
    // };
    // this.MarkHealthNotificationRead = function (int_updateID) {
    //     return this._sequelize.query(`CALL MarkHealthNotificationRead (${int_updateID})`);
    // };
    this.SelectAccountByUserAndPassword = async function (str_accountEmail, str_accountPasswordHash) {
        return await this._sequelize.query(`CALL SelectAccountByUserAndPassword ('${str_accountEmail}', '${str_accountPasswordHash}')`);
    };
    this.SelectAccountByUserOrGPID = async function (str_username, int_accountID) {
        return await this._sequelize.query(`CALL SelectAccountByUserOrGPID ('${str_username}', '${int_accountID}')`);
    };
    this.SelectLatestMeasurementById = async function (int_accountID, str_measurementType) {
        return await this._sequelize.query(`CALL SelectLatestMeasurementById (${int_accountID}, '${str_measurementType}')`);
    };
    // this.SelectGraphByAccountID = function (int_patientID) {
    //     return this._sequelize.query(`CALL SelectGraphByAccountID (${int_patientID})`);
    // };
    // this.SelectGraphByHealthNotificationID = function (int_healthNotificationID) {
    //     return this._sequelize.query(`CALL SelectGraphByHealthNotificationID (${int_healthNotificationID})`);
    // };
    // this.SelectGraphByID = function (int_graphID) {
    //     return this._sequelize.query(`CALL SelectGraphByID (${int_graphID})`);
    // };
    // this.SelectGraphTypeByID = function (int_graphTypeID) {
    //     return this._sequelize.query(`CALL SelectGraphTypeByID (${int_graphTypeID})`);
    // };
    // this.SelectHealthNotificationByAccountID = function (int_accountID, bool_archived, bool_notificationRead) {
    //     return this._sequelize.query(`CALL SelectHealthNotificationByAccountID (${int_accountID}; ${bool_archived}; ${bool_notificationRead})`);
    // };
    this.SelectLatestMeasurementDateByID = async function (int_accountId, str_measurementType) {
        return await this._sequelize.query(`CALL SelectLatestMeasurementDateByID (${int_accountId}, '${str_measurementType}')`);
    };
    // this.SelectMeasurementTypeByID = function (int_measurementTypeID) {
    //     return this._sequelize.query(`CALL SelectMeasurementTypeByID (${int_measurementTypeID})`);
    // };
    // this.SelectMeasurementsByAccountID = async function (int_accountID, str_type) {
    //     return await this._sequelize.query(`CALL SelectMeasurementsByAccountID (${int_accountID}, '${str_type}')`);
    // };
    // this.SelectMeasurementsByAccountIDBetweenDates = function (int_accountID, date_startDatetime, date_endDatetime) {
    //     return this._sequelize.query(`CALL SelectMeasurementsByAccountIDBetweenDates (${int_accountID}; '${date_startDatetime}', '${date_endDatetime}')`);
    // };
    this.SelectMeasurementsByID = async function (int_accountID, str_measurementType) {
        return await this._sequelize.query(`CALL SelectMeasurementsByID (${int_accountID}, '${str_measurementType}')`);
    };
    this.SelectMeasurementForToday = async function (int_accountID, str_measurementType) {
        return await this._sequelize.query(`CALL SelectMeasurementForToday (${int_accountID}, '${str_measurementType}')`);
    };
    this.SelectPatientsOfGPbyID = async function (int_accountID) {
        return await this._sequelize.query(`CALL SelectPatientsOfGPbyID (${int_accountID})`);
    };
    // this.SelectRoleByAccountID = function (int_accountID) {
    //     return this._sequelize.query(`CALL SelectRoleByAccountID (${int_accountID})`);
    // };
    this.SelectAccountByID = async function (int_accountID) {
        return await this._sequelize.query(`CALL SelectAccountByID (${int_accountID})`);
    };
    this.SelectProfileByID = async function (int_ID) {
        return await this._sequelize.query(`CALL SelectProfileByID (${int_ID})`);
    };
    this.SelectGPList = async function () {
        return await this._sequelize.query(`CALL SelectGPList ()`);
    };
    // this.SelectUnreadHealthNotificationByAccountID = function (int_accountID) {
    //     return this._sequelize.query(`CALL SelectUnreadHealthNotificationByAccountID (${int_accountID})`);
    // };
    this.UpdateProfile = async function (int_updateId, str_updateEmail, str_updateName, str_assignGP, str_updateAddress, str_updatePhone, int_height, int_weight) {
        return await this._sequelize.query(`CALL UpdateProfile (${int_updateId}, '${str_updateEmail}', '${str_updateName}', '${str_assignGP}', '${str_updateAddress}', '${str_updatePhone}', '${int_height}', '${int_weight}')`);
    };
    // this.UpdateGraph = function (int_updateID, str_updateTitle) {
    //     return this._sequelize.query(`CALL UpdateGraph (${int_updateID}, '${str_updateTitle}')`);
    // };
    // this.UpdateGraphType = function (int_updateID, str_updateType) {
    //     return this._sequelize.query(`CALL UpdateGraphType (${int_updateID}, '${str_updateType}')`);
    // };
    // this.UpdateHealthNotification = function (int_updateID, date_updateStartDatetime, date_updateEndDatetime) {
    //     return this._sequelize.query(`CALL UpdateHealthNotification (${int_updateID}, '${date_updateStartDatetime}', '${date_updateEndDatetime}')`);
    // };
    // this.UpdateMeasurementType = function (int_updateID, str_updateType) {
    //     return this._sequelize.query(`CALL UpdateMeasurementType (${int_updateID}, '${str_updateType}')`);
    // };
    this.UpdateMeasurements = async function (int_updateID, int_updateReading) {
        return await this._sequelize.query(`CALL UpdateMeasurements (${int_updateID}, ${int_updateReading})`);
    };
    // this.UpdatePassword = function (int_updateID, str_updateHash) {
    //     return this._sequelize.query(`CALL UpdatePassword (${int_updateID}, '${str_updateHash}')`);
    // };
    // this.UpdateRoles = function (int_updateID, str_updateRolesType) {
    //     return this._sequelize.query(`CALL UpdateRoles (${int_updateID}, '${str_updateRolesType}')`);
    // };
    // this.UpdateScheduler = function (int_updateID, date_updatePredictionTimePeriodtime, date_updateSyncTimePeriodtime) {
    //     return this._sequelize.query(`CALL UpdateScheduler (${int_updateID}, '${date_updatePredictionTimePeriodtime}', '${date_updateSyncTimePeriodtime}')`);
    // }
};