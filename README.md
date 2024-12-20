# **Webflow Attribute Editor V1**

Boost your Webflow productivity with a visual attribute editor. This Chrome extension allows you to open a sleek modal to edit input attributes visually and see changes instantly reflected in your Webflow Designer.

---

## **Features**

- 🖌 **Visual Editing**: Edit attribute values in a visually enhanced modal.
- 🔄 **Live Updates**: Changes are instantly synced to Webflow inputs.
- ✨ **Streamlined UI**: User-friendly interface for editing attributes like `class`, `id`, or other input values.
- 🚀 **Enhanced Workflow**: Save time by avoiding tedious manual attribute editing.
- 🔍 **Auto Formatting**: Formats `class` attributes into readable multi-line values in the editor.

---

## **How It Works**

1. 🖱 Hover over any Webflow attribute input field.
2. 🖋 Click the **expand icon** to open the modal editor.
3. ✍ Edit the value in a clean, resizable text area with syntax formatting.
4. 💾 Save the changes, and the updated value will reflect immediately in the Webflow Designer.

---

## **Installation**

1. **Clone or Download**:

   - Clone the repository:
     ```bash
     git clone https://github.com/yourusername/webflow-attribute-editor.git
     ```
   - Or download the ZIP file and extract it.

2. **Load Unpacked Extension**:

   - Go to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle in the top-right corner).
   - Click **Load unpacked** and select the extension folder.

3. **Start Editing**:
   - Open any project in Webflow Designer and start editing attributes with the enhanced modal!

---

## **Screenshots**

### Expand Icon

![Expand Icon](https://your-image-url.com)

### Modal Editor

![Modal Editor](https://your-image-url.com)

---

## **Permissions**

This extension requires the following permissions:

- **activeTab**: To modify content on the active tab.
- **host_permissions**: To run on Webflow URLs (`*://*.webflow.com/*`).
- **scripting**: For interacting with the DOM to enhance attribute fields.

---

## **File Structure**

```
/extension
├── icons/
│   ├── Attribute-Editor-16.png
│   ├── Attribute-Editor-19.png
│   ├── Attribute-Editor-32.png
│   ├── Attribute-Editor-38.png
│   ├── Attribute-Editor-48.png
│   └── Attribute-Editor-124.png
├── content.js
├── styles.css
├── manifest.json
└── README.md
```

---

## **Contributing**

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

---

## **Known Issues**

- If the modal does not appear, refresh the Webflow Designer page and try again.
- Some advanced input types may not be fully supported (e.g., custom widgets).

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Roadmap**

Planned features for future updates:

- Syntax highlighting for attribute values.
- Enhanced auto-formatting for HTML attributes.
- Support for additional Webflow features.
