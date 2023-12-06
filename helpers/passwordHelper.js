import bcrypt from "bcrypt";

export const hashpassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedpassword = await bcrypt.hash(password, saltRound);
    return hashedpassword;
  } catch (err) {
    console.log(err);
  }
};

export const comparePassword = async (password, hashedpassword) => {
  try {
    return bcrypt.compare(password, hashedpassword);
  } catch (err) {
    console.log(err);
  }
};
