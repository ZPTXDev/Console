const { STRING, INTEGER, TEXT, FLOAT, UUID, UUIDV4 } = require('sequelize');

module.exports = {
	Users: {
		id: {
			type: STRING,
			unique: true,
			primaryKey: true,
		},
		wallet: {
			type: INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		bank: {
			type: INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		jobPoints: {
			type: INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		timesWorked: {
			type: INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		energy: {
			type: INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		energyCap: {
			type: INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		experience: {
			type: FLOAT,
			defaultValue: 0.00,
			allowNull: false,
		},
	},
	Job: {
		id: {
			type: UUID,
			defaultValue: UUIDV4,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		name: {
			type: TEXT,
			allowNull: false,
		},
		requiredJobPoints: {
			type: INTEGER,
			allowNull: false,
		},
		workQuota: {
			type: INTEGER,
			allowNull: false,
		},
		baseSalary: {
			type: INTEGER,
			allowNull: false,
		},
	},
	Transaction: {
		id: {
			type: UUID,
			defaultValue: UUIDV4,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		walletBefore: {
			type: INTEGER,
			allowNull: false,
		},
		walletAfter: {
			type: INTEGER,
			allowNull: false,
		},
		bankBefore: {
			type: INTEGER,
			allowNull: false,
		},
		bankAfter: {
			type: INTEGER,
			allowNull: false,
		},
		reason: {
			type: TEXT,
			allowNull: false,
		},
	},
};