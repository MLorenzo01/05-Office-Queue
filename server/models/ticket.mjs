import { DataTypes } from "sequelize";
import sequelize from "../db.mjs";
import Service from "./service.mjs";
import Counter from "./counter.mjs";

const Ticket = sequelize.define(
    "Ticket",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        serviceId: {
            type: DataTypes.INTEGER,
            references: {
                model: Service,
                key: "id",
            },
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isServed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        servedNow: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        counterID: {
            type: DataTypes.INTEGER,
            references: {
                model: Counter,
                key: "id",
            },
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

// Define association
Ticket.belongsTo(Service, { foreignKey: "serviceId" });
Ticket.belongsTo(Counter, { foreignKey: "counterID" });

Counter.hasMany(Ticket, { foreignKey: "counterID" });
Service.hasMany(Ticket, { foreignKey: "serviceId" });

export default Ticket;
