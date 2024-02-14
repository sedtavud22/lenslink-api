const prisma = require("../models/prisma");

exports.createWork = (data) => prisma.work.create({ data });
