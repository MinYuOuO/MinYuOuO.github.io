# Caribbean Juice Bar - Interactive WebAR & Ordering Prototype

A modern, responsive web application prototype designed for **Caribbean Juice Bar (Johor)**. This project is developed as a course project for the Multimedia Technology syllabus, showcasing the integration of **Augmented Reality (AR)** and **3D interactive product visualization** inside a digital restaurant menu.

---

## 🌟 Key Features

*   **Augmented Reality (AR) & 3D Viewer**: Integrated with the **Kivicube WebAR SDK** via an interactive side drawer, allowing customers to view 3D models of drinks and project them into their physical space (using device cameras).
*   **Automatic Theme Matching**: Detects the user's device system preference (Light/Dark Mode) on initial load and sets the corresponding theme (**Organic Tropical** cream or **Obsidian Jungle** dark green) automatically.
*   **Fully Responsive Navigation**: The top navbar automatically scales down on mobile viewports, hiding text labels and shrinking the logo size to prevent wrapping or layout breakage.
*   **Interactive Cart & Table Ordering**:
    *   Select a table number (Table 1–5).
    *   Add items to the order.
    *   Interactive cart drawer with real-time quantity adjustments, subtotal, 6% service tax calculation, and simulated checkout.
*   **Presenter Control Deck**: A collapsible accordion panel inside the AR drawer built specifically for grading/presentation. Allows examiners to dynamically load and test any custom Kivicube Scene ID or Collection ID.
*   **Visit & Contact Hub**: Lists official operating hours, a clickable email address, social media links, and direct navigation buttons for **Google Maps** and **Waze**.

---

## 🛠️ Technologies Used

*   **Structure**: HTML5 (Semantic elements)
*   **Styling**: CSS3 (Vanilla CSS, custom variables, glassmorphism, responsive grid/flexbox layouts, CSS keyframe animations)
*   **Logic**: JavaScript (ES6+, DOM manipulation, localStorage-ready state, system media queries)
*   **AR Engine**: Kivicube Web iframe SDK
*   **Icons**: FontAwesome v6.4.0 (CDN)
*   **Typography**: Google Fonts (Playfair Display & Inter)

---

## 📂 Project Structure

```text
caribbean/
│
├── index.html        # Main page structure, modal drawers, and visit sections
├── style.css         # Typography, color tokens, layout systems, and animations
├── app.js            # Menu data, cart logic, WebAR iframe handler, and theme controller
├── logo.svg          # Official green brand logo
├── favicon.svg       # Custom square favicon optimized with a white background for browser tabs
├── storefront.png    # Actual beachfront storefront image of Caribbean Juice Bar (Johor)
└── README.md         # Project documentation
```

---

## 🚀 How to Run Locally

Since this is a client-side prototype built using standard web technologies, there is no server installation required:

1.  Clone or download this project folder to your local machine.
2.  Double-click [index.html](file:///d:/Assignment/034_MultimediaTechnology/assignment2/caribbean/index.html) to open the application in any modern web browser (Chrome, Safari, Edge, or Firefox).
3.  To test the **Augmented Reality (AR) features**, ensure your device has a camera and you grant camera permissions when prompted by the Kivicube iframe.

---

## 📝 Assignment Credits

*   **Copyright**: © 2026 **onyxtech & lighoxy**. All rights reserved.
*   **Target Vibe**: Modeled after the official branding of [Caribbean Juice Bar Johor](https://caribbeanjuicebar.wixsite.com/johor).
*   **AR Scene ID**: `uqdAQAKvWo39yF53kwd18NN6gLc6DaKN` (Used as the default scene mapping for all demo items).
*   **Pure Integrity**: *"We believe in transparency and honesty. Every ingredient in our juices is selected with care, ensuring that you experience the pure, unadulterated taste of nature."*
