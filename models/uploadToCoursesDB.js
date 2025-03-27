import mongoose from "mongoose";
import fs from "fs";
import Course from "../models/courseModel.js";

// Connessione al database MongoDB
mongoose.connect(
  "mongodb+srv://codexency_admin:9fnwUXuKigW89X2@codexencycluster.6psj1le.mongodb.net/agmnails?retryWrites=true&w=majority&appName=codexencycluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedData = async () => {
  try {
    // Leggi i dati dal file JSON
    const data = JSON.parse(fs.readFileSync("./coursesData.json", "utf-8"));

    // Rimuovi eventuali dati precedenti nel database
    await Course.deleteMany();

    // Inserisci i dati nel database
    await Course.insertMany(data);
    console.log("Dati caricati con successo!");

    // Chiudi la connessione al database
    mongoose.connection.close();
  } catch (error) {
    console.error("Errore durante il caricamento dei dati:", error);
    mongoose.connection.close();
  }
};

seedData();
