import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Utilizatorul nu a fost găsit" });
    }
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error("Eroare la obținerea datelor utilizatorului:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Eroare internă" });
  }
};


export const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!updatedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Utilizatorul nu a fost găsit" });
    }
    res.status(StatusCodes.OK).json({
      user: updatedUser,
      msg: "Datele au fost actualizate cu succes.",
    });
  } catch (error) {
    console.error("Eroare la actualizarea datelor utilizatorului:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Eroare internă" });
  }
};
