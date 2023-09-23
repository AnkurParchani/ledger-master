const fs = require("fs");

const AppError = require("../utils/appError");
const Customer = require("./../models/customerModel");
const Entry = require("./../models/ledgerEntriesModel");
const ApiFeatures = require("../utils/apiFeatures");
const lowerCaseQuery = require("../utils/lowerCaseQuery");

exports.getAllCustomers = async (req, res, next) => {
  const queryObj = lowerCaseQuery(req.query);

  // A) Filtering
  const query = Customer.find(queryObj)
    .where({ user: req.user._id })
    .populate("entries");

  // B) Sorting and Limiting fields
  new ApiFeatures(query, req.query).sort("name");

  // EXECUTING QUERY
  const customers = await query;

  res.status(200).json({
    status: "success",
    result: customers.length,
    data: customers
  });
};

exports.getCustomer = async (req, res, next) => {
  const customer = await Customer.findById(req.params.id)
    .where({ user: req.user._id })
    .populate("entries");

  const { searchDate, particulars, debitBalance, creditBalance } = req.query;

  if (searchDate) {
    customer.entries = customer.entries.filter(
      entry => entry.searchDate === searchDate
    );
  }

  if (particulars) {
    customer.entries = customer.entries.filter(
      entry => entry.particulars === particulars
    );
  }

  if (debitBalance) {
    customer.entries = customer.entries.filter(
      entry => entry.debitBalance === debitBalance
    );
  }

  if (creditBalance)
    customer.entries = customer.entries.filter(
      entry => entry.creditBalance === creditBalance
    );

  if (!customer)
    return next(new AppError(404, "No Customer found with this request"));

  res.status(200).json({ status: "success", customer });
};

exports.createCustomer = async (req, res, next) => {
  try {
    if (!req.body.firmName || !req.body.name || !req.body.area)
      return next(
        new AppError(400, "Please provide all the mandatory details")
      );

    if (req.body.phoneNumber && req.body.phoneNumber.length > 10) {
      return next(new AppError(400, "Phone number must be of 10 digit"));
    }

    req.body.user = req.user._id;

    const customer = await Customer.create(req.body);

    res.status(200).json({
      status: "success",
      data: customer
    });
  } catch (err) {
    console.log("Error from customerController createOne", err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  const customer = await Customer.findById(req.params.id).where({
    user: req.user._id
  });

  if (!customer)
    return next(new AppError(404, `No customer found with this ID`));

  customer.set(req.body);
  await customer.save();

  res.status(200).json({
    status: "success",
    customer: customer
  });
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    await Entry.deleteMany({ customer: req.params.id });

    const path = "public/img/documents/";
    const customerId = req.params.id;

    fs.readdirSync(path, { withFileTypes: true }).forEach(file => {
      // check if the file is a file and its name contains the customer id
      if (file.isFile() && file.name.includes(customerId)) {
        // delete the file
        fs.unlinkSync(path + file.name);
      }
    });
    const customer = await Customer.findByIdAndDelete({
      _id: req.params.id
    }).where({ user: req.user._id });

    if (!customer)
      return next(new AppError(404, `No customer found with this ID`));

    res.status(200).json({
      status: "success",
      customer
    });
  } catch (err) {
    console.log("Error from delete customer", err);
  }
};
