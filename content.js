class AttributeEditor {
  constructor() {
    this.currentInput = null;
    this.escapeListener = null;
    this.setupModalTemplate();
    this.setupMutationObserver();
    this.enhanceExistingInputs();
  }

  setupModalTemplate() {
    this.modalTemplate = document.createElement("template");
    this.modalTemplate.innerHTML = `
        <div class="wf-attribute-modal-overlay">
          <div class="wf-attribute-modal">
            <div class="wf-attribute-modal-header">
              <div class="wf-attribute-modal-title">Edit Attribute Value</div>
              <button class="wf-attribute-modal-button secondary close-button">
                <svg class="close-icon-x" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="#888888" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              </button>
            </div>
            <div class="wf-attribute-modal-content">
              <textarea class="wf-attribute-editor" spellcheck="false"></textarea>
            </div>
            <div class="wf-attribute-modal-footer">
              <button class="wf-attribute-modal-button secondary cancel-button">Cancel</button>
              <button class="wf-attribute-modal-button primary save-button">Save</button>
            </div>
          </div>
        </div>
      `;
  }

  createExpandIcon() {
    const icon = document.createElement("button");
    icon.className = "wf-attribute-expand-icon";
    icon.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.33333 6.66667L14 2M14 2H10M14 2V6M6.66667 9.33333L2 14M2 14H6M2 14V10" stroke="#888888" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const wrapper = e.target.closest(".w-ExpressionEditor-fieldWrapper");
      if (wrapper) {
        this.openModal(wrapper);
      }
    };

    icon.addEventListener("click", handleClick);
    return icon;
  }

  setupModalEventListeners(modalElement) {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    };

    const handleOutsideClick = (e) => {
      // Check if click is on overlay or modal container itself
      if (e.target.classList.contains("wf-attribute-modal-overlay")) {
        this.closeModal();
      }
    };

    // Store reference to escape listener for cleanup
    this.escapeListener = handleEscape;

    // Add all event listeners
    document.addEventListener("keydown", handleEscape);
    modalElement.addEventListener("click", handleOutsideClick);

    // Button click handlers
    modalElement
      .querySelector(".close-button")
      .addEventListener("click", () => this.closeModal());
    modalElement
      .querySelector(".cancel-button")
      .addEventListener("click", () => this.closeModal());
    modalElement
      .querySelector(".save-button")
      .addEventListener("click", () => this.saveAndClose());

    // Prevent clicks inside modal from bubbling to overlay
    modalElement
      .querySelector(".wf-attribute-modal")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });
  }

  openModal(wrapper) {
    const input = wrapper.querySelector(
      'input[data-wf-base-text-input="true"]'
    );
    if (!input) return;

    this.currentInput = input;

    // Clone and append modal
    const modalNode = this.modalTemplate.content.cloneNode(true);
    document.body.appendChild(modalNode);

    const modalElement = document.querySelector(".wf-attribute-modal-overlay");
    if (!modalElement) return;

    const editor = modalElement.querySelector(".wf-attribute-editor");
    if (!editor) return;

    // Set up the editor
    editor.value = this.formatValue(input.value);

    // Set up all modal event listeners
    this.setupModalEventListeners(modalElement);

    // Handle Enter and Shift+Enter
    editor.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (e.shiftKey) {
          // Allow Shift+Enter to create new line
          return;
        } else {
          // Regular Enter saves and closes
          e.preventDefault();
          this.saveAndClose();
        }
      }
    });

    // Setup textarea auto-resize
    const handleResize = () => {
      editor.style.height = "auto";
      editor.style.height = editor.scrollHeight + "px";
    };

    editor.addEventListener("input", handleResize);

    // Initial resize and focus
    handleResize();
    editor.focus();
  }

  formatValue(value) {
    if (value.includes("class=") || value.includes("className=")) {
      return value.replace(
        /(class|className)="([^"]+)"/,
        (match, attr, classes) => {
          const formattedClasses = classes
            .split(" ")
            .filter((c) => c)
            .join("\n");
          return `${attr}="${formattedClasses}"`;
        }
      );
    }
    return value;
  }

  saveAndClose() {
    const modalElement = document.querySelector(".wf-attribute-modal-overlay");
    const editor = modalElement?.querySelector(".wf-attribute-editor");

    if (this.currentInput && editor) {
      let value = editor.value;
      if (value.includes("class=") || value.includes("className=")) {
        value = value.replace(
          /(class|className)="([^"]+)"/,
          (match, attr, classes) => {
            const compressedClasses = classes
              .split("\n")
              .filter((c) => c.trim())
              .join(" ");
            return `${attr}="${compressedClasses}"`;
          }
        );
      }

      this.currentInput.value = value;
      this.currentInput.dispatchEvent(new Event("input", { bubbles: true }));
    }

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector(".wf-attribute-modal-overlay");
    if (modal) {
      modal.remove();
    }

    // Clean up escape key listener
    if (this.escapeListener) {
      document.removeEventListener("keydown", this.escapeListener);
      this.escapeListener = null;
    }

    this.currentInput = null;
  }

  enhanceInput(wrapper) {
    const input = wrapper.querySelector(
      'input[data-wf-base-text-input="true"]'
    );
    if (!input) return;

    if (wrapper.querySelector(".wf-attribute-expand-icon")) return;

    const container = input.parentElement;
    if (container) {
      container.style.position = "relative";
      container.appendChild(this.createExpandIcon());
    }
  }

  setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const wrappers = node.querySelectorAll(
              ".w-ExpressionEditor-fieldWrapper"
            );
            wrappers.forEach((wrapper) => this.enhanceInput(wrapper));

            if (node.classList?.contains("w-ExpressionEditor-fieldWrapper")) {
              this.enhanceInput(node);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  enhanceExistingInputs() {
    document
      .querySelectorAll(".w-ExpressionEditor-fieldWrapper")
      .forEach((wrapper) => {
        this.enhanceInput(wrapper);
      });
  }
}

// Initialize the attribute editor
new AttributeEditor();

console.log("Webflow Attribute Editor loaded!");
