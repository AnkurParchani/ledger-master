/* eslint-disable */
// Reviews data
export const reviews = [
  {
    name: "Ankur parchani",
    stars: 1,
    review:
      "I recently discovered this ledger website and I have to say, it has made managing my finances so much easier! The interface is straightforward and easy to navigate, making it simple to add and manage customer entries. Overall, I would highly recommend this website to anyone looking for a reliable and efficient way to manage their finances."
  },
  {
    name: "Ankur parchani",
    stars: 2,
    review:
      "I recently discovered this ledger website and I have to say, it has made managing my finances so much easier! The interface is straightforward and easy to navigate, making it simple to add and manage customer entries. Overall, I would highly recommend this website to anyone looking for a reliable and efficient way to manage their finances."
  },
  {
    name: "Ankur parchani",
    stars: 3,
    review:
      "I recently discovered this ledger website and I have to say, it has made managing my finances so much easier! The interface is straightforward and easy to navigate, making it simple to add and manage customer entries. Overall, I would highly recommend this website to anyone looking for a reliable and efficient way to manage their finances."
  },
  {
    name: "Ankur parchani",
    stars: 4,
    review:
      "I recently discovered this ledger website and I have to say, it has made managing my finances so much easier! The interface is straightforward and easy to navigate, making it simple to add and manage customer entries. Overall, I would highly recommend this website to anyone looking for a reliable and efficient way to manage their finances."
  },
  {
    name: "Ankur parchani",
    stars: 5,
    review:
      "I recently discovered this ledger website and I have to say, it has made managing my finances so much easier! The interface is straightforward and easy to navigate, making it simple to add and manage customer entries. Overall, I would highly recommend this website to anyone looking for a reliable and efficient way to manage their finances."
  },
  {
    name: "Ankur parchani",
    stars: 5,
    review:
      "I recently discovered this ledger website and I have to say, it has made managing my finances so much easier! The interface is straightforward and easy to navigate, making it simple to add and manage customer entries. Overall, I would highly recommend this website to anyone looking for a reliable and efficient way to manage their finances."
  }
];
reviews.forEach(review => {
  review.symbol = review.name.charAt(0);
});

// Frequently asked questions
export const faq = [
  {
    question: "Is this Website free to use?",
    answer:
      "Yes, this is a demo app that is completely free to use. However, it's important to note that as a demo app, it may not have all the features of a fully developed application. Additionally, please be aware that user accounts are automatically deleted after 7 days to maintain a clean database. "
  },
  {
    question: "Is this Website secure?",
    answer:
      "As a demo app, we prioritize the security of user data and take all necessary measures to protect it from potential security breaches. However, please keep in mind that as a demo app, it may not have all the security features of a fully developed application. We recommend that users do not share sensitive information on this demo app and use it only for testing purposes"
  },
  {
    question:
      "Is there a risk that my data may be shared with third-party entities?",
    answer:
      "No, we do not share user data with any third-party entities. We respect the privacy of our users and are committed to protecting their data. We only collect user data for the sole purpose of providing the demo app's functionality and do not use it for any other purposes."
  },
  {
    question: "What if I Forget my password?",
    answer:
      "Unfortunately, we have not implemented the password reset functionality on this demo app. If you forget your password, we won't be able to help you recover your account. However, please keep in mind that user accounts are automatically deleted after seven days. We apologize for any inconvenience this may cause. If you need to use this app again, you will need to create a new account."
  },
  {
    question:
      "Is there a limit on the number of entries I can create for a Customer?",
    answer:
      "No, there is no limit on the number of entries you can create for a customer. You are free to create as many entries as needed to keep track of the customer's transactions."
  },
  {
    question: "How can I Delete my Account?",
    answer: `Unfortunately, Our website does not have a dedicated "My Account" page and there is currently no way for users to delete their accounts manually. All user accounts will be automatically deleted after 7 days, regardless of their activity or inactivity on the website. This is done to ensure that any personal information associated with your account is securely deleted from our systems in a timely manner. We apologize for any inconvenience this may cause. `
  },
  {
    question:
      "Can I Edit or Delete a Customer or entry after it has been created?",
    answer:
      "Yes, you can edit or delete a customer or entry after it has been created. Simply click on the edit icon of respective customer or entry you want to edit or delete. From there you can choose your preferred action"
  },
  {
    question: "Got any more Queries?",
    answer:
      "If you have any further questions or concerns, You can contact us via phone at 98XXXXXXXX or send us an email at ankurparchani@gmail.com. We're always happy to assist our users and appreciate any feedback you may have about our demo app."
  }
];
