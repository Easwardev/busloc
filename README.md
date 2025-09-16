# Busloc - Kollam Live Bus Tracker

**Live Website:** [https://buslocc.netlify.app/]

A real-time bus tracking application for the Kollam district in Kerala. This web app allows users to select a starting and destination bus stand and view a list of scheduled services. Users can then click on a specific service to see an animated, road-accurate route on an interactive map.

The entire application supports both English and Malayalam languages.

---

### Key Features

* **Route Search:** Select "From" and "To" locations from a filterable dropdown list.
* **Bus Schedule:** View a list of available buses for the selected route with departure and arrival times.
* **Interactive Map:** Click on a bus service to view its route animated on a map, complete with a custom bus icon and an ETA display.
* **Dynamic Routing:** Uses the OSRM (Open Source Routing Machine) API to generate highly accurate, road-following paths in real-time.
* **Bilingual Support:** Full support for both English and Malayalam, with a simple toggle to switch between languages.

### Tech Stack

* **Front-End:** React, TypeScript, Vite
* **Mapping:** Leaflet.js
* **Routing Engine:** OSRM API
* **Styling:** CSS
* **Deployment:** Netlify (via GitHub Actions)

---

### How to Run This Project Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Easwardev/busloc.git](https://github.com/Easwardev/busloc.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd busloc
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:5173`.