import { auth } from "@/auth";

// Assign the arrow function to a variable before exporting
const restrictedContent = async (req, res) => {
  const session = await auth(req, res);

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
};

export default restrictedContent;
