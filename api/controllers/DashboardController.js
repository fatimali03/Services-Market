const User = require("../models/UserModel");
const Order = require("../models/orderModel");
const Service = require("../models/serviceModel");
const Testimonial = require("../models/testimonialModel");
const { getServiceRating } = require("./TestimonialsController");

const companyDashboard = async (userId) => {
  const selectedcompany = await User.findById(userId);
  if (selectedcompany) {
    if (selectedcompany.role != "company") {
      return "You Don't Have Permission";
    }

    let ordersNumber = 0;
    let companyRevenues = 0;
    let completedOrders = 0;

    const orders = await Order.find({ status: "Completed" });
    const allOrders = await Order.find();
    if (allOrders.length != 0) {
      for (let i of allOrders) {
        const selectedService = await Service.findById(i.serviceId);
        if (
          selectedService.userId.toString() == selectedcompany._id.toString()
        ) {
          ordersNumber++;
        }
      }
    }
    if (orders.length != 0) {
      for (let i of orders) {
        const selectedService = await Service.findById(i.serviceId);
        if (
          selectedService.userId.toString() == selectedcompany._id.toString()
        ) {
          completedOrders++;
          companyRevenues += selectedService.price;
        }
      }
    }

    let companyRating = 0;
    let companyTestimonials = [];

    const services = await Service.find({ userId: selectedcompany });
    if (services.length != 0) {
      // Rating
      let servicesNumber = 0;
      let sumServiceRating = 0;
      for (let i of services) {
        let selectedServiceRating = await getServiceRating(i._id);
        if (selectedServiceRating != 0) {
          servicesNumber++;
          sumServiceRating += parseFloat(selectedServiceRating);
        }
      }
      if (servicesNumber != 0) {
        companyRating = (sumServiceRating / servicesNumber).toFixed(1);
      }
      // Testimonials
      let companyServicesTestimonials = [];
      for (let i of services) {
        const serviceTestimonials = await Testimonial.find({
          serviceId: i._id,
        });
        companyServicesTestimonials.push(...serviceTestimonials);
      }
      for (let i of companyServicesTestimonials) {
        let cpt = 0;
        const clientInfo = await User.findById(i.clientId);

        if (companyTestimonials.length != 0) {
          for (let j of companyTestimonials) {
            if (i.clientId.toString() == j.clientId.toString()) {
              cpt++;
            }
          }

          if (cpt == 0) {
            companyTestimonials.push({
              ...i._doc,
              clientUsername: clientInfo.username,
              clientAvatar: clientInfo.image,
            });
          }
        } else {
          companyTestimonials.push({
            ...i._doc,
            clientUsername: clientInfo.username,
            clientAvatar: clientInfo.image,
          });
        }
      }
    }
    return {
      username: selectedcompany.username,
      revenues: companyRevenues,
      ordersNumber,
      completedOrders,
      rating: companyRating,
      testimonials: companyTestimonials,
    };
  }
  return "User doesn't exist";
};

const clientDashboard = async (userId) => {
  const selectedClient = await User.findById(userId);
  if (selectedClient) {
    if (selectedClient.role != "client") {
      return "You Don't Have Permission";
    }
    const orders = await Order.find({
      clientId: selectedClient._id,
    });
    const ordersMade = orders.length;
    let completedOrders = 0;
    let expenses = 0;
    if (orders.length != 0) {
      let servicesPriceSum = 0;
      for (let i of orders) {
        if (i.status == "Completed") {
          completedOrders++;
          const selectedService = await Service.findById(i.serviceId);
          servicesPriceSum += parseFloat(selectedService.price);
        }
      }
      expenses = servicesPriceSum.toFixed(2);
    }
    const testimonialsMade = [];
    const clientTestimonials = await Testimonial.find({
      clientId: selectedClient._id,
    });
    if (clientTestimonials.length > 0) {
      for (let i of clientTestimonials) {
        const serviceUserId = (await Service.findById(i.serviceId)).userId;
        const userInfo = await User.findById(serviceUserId);
        if (testimonialsMade.length != 0) {
          let cpt = 0;
          for (let j of testimonialsMade) {
            if (j.companyUsername == userInfo.username) {
              cpt++;
            }
          }
          if (cpt == 0) {
            testimonialsMade.push({
              testimonialText: i.text,
              companyUsername: userInfo.username,
              companyAvatar: userInfo.image,
            });
          }
        } else {
          testimonialsMade.push({
            testimonialText: i.text,
            companyUsername: userInfo.username,
            companyAvatar: userInfo.image,
          });
        }
      }
    }
    return {
      username: selectedClient.username,
      expenses,
      orders: ordersMade,
      completedOrders,
      testimonials: testimonialsMade,
    };
  }
  return "User doesn't exist";
};

module.exports = { companyDashboard, clientDashboard };
