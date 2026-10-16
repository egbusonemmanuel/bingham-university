/**
 * Bingham University Student Portal (MyBHU) - Payments Dashboard Engine
 * Exact match to user screenshot layout and interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initAlert();
  initSidebar();
  initNavbarActions();
  initSessionTabs();
  initModals();
  initCalendar();
  initRemita();
});

// 1. Blue Alert Banner Close
function initAlert() {
  const alertBox = document.getElementById("fees-alert-box");
  const closeBtn = document.getElementById("btn-close-alert");
  if (closeBtn && alertBox) {
    closeBtn.addEventListener("click", () => {
      alertBox.style.opacity = "0";
      alertBox.style.transform = "scale(0.98)";
      setTimeout(() => alertBox.remove(), 200);
    });
  }
}

// 2. Official MyBHU Sidebar & Collapsible Tree Navigation
function initSidebar() {
  const sidebar = document.getElementById("portal-sidebar");
  const hamburger = document.getElementById("btn-hamburger");
  const backdrop = document.getElementById("sidebar-backdrop");
  const closeBtn = document.getElementById("btn-close-sidebar");

  function closeMobileSidebar() {
    if (sidebar) {
      sidebar.classList.remove("mobile-open");
    }
    if (backdrop) {
      backdrop.classList.add("hidden");
    }
  }

  function toggleSidebar() {
    if (!sidebar) return;
    if (window.innerWidth <= 1024) {
      const isOpen = sidebar.classList.toggle("mobile-open");
      if (backdrop) {
        backdrop.classList.toggle("hidden", !isOpen);
      }
    } else {
      sidebar.classList.toggle("collapsed");
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSidebar();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMobileSidebar();
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", () => {
      closeMobileSidebar();
    });
  }

  // Window resize guard
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeMobileSidebar();
    }
  });

  // Collapsible Accordion Groups (Fees & Payments, Academics)
  const groupHeaders = document.querySelectorAll(".sidebar-group-header");
  groupHeaders.forEach(header => {
    header.addEventListener("click", (e) => {
      e.preventDefault();
      const parentGroup = header.closest(".sidebar-group");
      if (parentGroup) {
        if (parentGroup.classList.contains("open")) {
          parentGroup.classList.remove("open");
          parentGroup.classList.add("closed");
        } else {
          parentGroup.classList.remove("closed");
          parentGroup.classList.add("open");
        }
      }
    });
  });

  // Sidebar Sub-Links Click Selection & View Switching
  const subLinks = document.querySelectorAll(".sidebar-sub-link");
  const contentViewport = document.querySelector(".content-viewport");
  const paymentsPane = document.querySelector(".payments-main-pane");
  const schedulePane = document.getElementById("view-payment-schedule");

  function switchView(viewName) {
    // Hide all content panes
    if (paymentsPane) paymentsPane.classList.add("hidden");
    if (schedulePane) schedulePane.classList.add("hidden");

    // Reset content-viewport to default (2-column)
    if (contentViewport) contentViewport.classList.remove("schedule-active");

    if (viewName === "payment-schedule") {
      if (schedulePane) schedulePane.classList.remove("hidden");
      if (contentViewport) contentViewport.classList.add("schedule-active");
    } else {
      // Default: show Payments dashboard
      if (paymentsPane) paymentsPane.classList.remove("hidden");
    }

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  subLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      subLinks.forEach(l => l.classList.remove("active-sub"));
      link.classList.add("active-sub");
      const label = link.textContent.trim();
      const linkId = link.id;

      // View switching based on sub-link
      if (linkId === "nav-sub-schedule") {
        switchView("payment-schedule");
      } else if (linkId === "nav-sub-payments") {
        switchView("payments");
      } else {
        switchView("payments");
        showToast("Navigation", `Navigating to ${label}`, "info");
      }

      // On mobile, auto-close sidebar after selection
      if (window.innerWidth <= 1024) {
        closeMobileSidebar();
      }
    });
  });

  // Regular nav links (Accommodation, Notifications)
  const navLinks = document.querySelectorAll(".sidebar-nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      subLinks.forEach(l => l.classList.remove("active-sub"));
      const label = link.querySelector("span")?.textContent.trim() || "Section";
      showToast(label, `Opening ${label} module...`, "info");
      if (window.innerWidth <= 1024) {
        closeMobileSidebar();
      }
    });
  });

  // Dashboard Item
  const dashboardItem = document.getElementById("nav-item-dashboard");
  if (dashboardItem) {
    dashboardItem.addEventListener("click", (e) => {
      e.preventDefault();
      subLinks.forEach(l => l.classList.remove("active-sub"));
      switchView("payments");
      showToast("Dashboard", "Returned to Payments Dashboard.", "info");
      if (window.innerWidth <= 1024) {
        closeMobileSidebar();
      }
    });
  }
}

// 3. Navbar Actions (Search, Theme Toggle, User Profile)
function initNavbarActions() {
  const btnSearch = document.getElementById("btn-search");
  const btnMoon = document.getElementById("btn-moon");
  const btnUserBadge = document.getElementById("btn-user-badge");
  const btnHandbook = document.getElementById("btn-download-handbook");

  if (btnSearch) {
    btnSearch.addEventListener("click", () => {
      showToast("Search Portal", "Search for courses, remita receipts, and schedules...", "info");
    });
  }

  if (btnMoon) {
    btnMoon.addEventListener("click", () => {
      showToast("Dark Mode", "Carbon Dark theme is currently active.", "info");
    });
  }

  if (btnUserBadge) {
    btnUserBadge.addEventListener("click", () => {
      showToast("Student Account", "Signed in as Chinonso John Paul Aladi (BHU/22/01/05/0040)", "info");
    });
  }

  if (btnHandbook) {
    btnHandbook.addEventListener("click", () => {
      showToast("Student Handbook", "Downloading Bingham University Undergraduate Student Handbook (2026/2027)...", "success");
    });
  }
}

// 4. Session Navigation Tabs
function initSessionTabs() {
  const tabs = document.querySelectorAll(".session-tab-link");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const session = tab.getAttribute("data-session");
      showToast("Session Changed", `Switched view to ${session}`, "info");
    });
  });
}

// 5. Modals and Interactive Buttons
function initModals() {
  const modal = document.getElementById("modal-transaction");
  const modalTitle = document.getElementById("modal-title");
  const btnNewTx = document.getElementById("btn-new-transaction");
  const btnFundWallet = document.getElementById("btn-fund-wallet");
  const btnEditProfile = document.getElementById("btn-edit-profile");
  const btnCourseReg = document.getElementById("btn-course-reg-portal");
  const btnClose = document.querySelectorAll(".btn-close-modal");
  const btnSubmit = document.getElementById("btn-submit-payment");

  if (btnNewTx) {
    btnNewTx.addEventListener("click", () => {
      modalTitle.textContent = "New Transaction";
      modal.classList.remove("hidden");
    });
  }

  if (btnFundWallet) {
    btnFundWallet.addEventListener("click", () => {
      modalTitle.textContent = "Fund My Wallet";
      modal.classList.remove("hidden");
    });
  }

  if (btnEditProfile) {
    btnEditProfile.addEventListener("click", () => {
      showToast("Edit Profile", "Opening student profile editor for Chinonso Aladi…", "info");
    });
  }

  if (btnCourseReg) {
    btnCourseReg.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Course Registration Portal", "Connecting to 2025/2026 course enrollment…", "info");
    });
  }

  btnClose.forEach(b => {
    b.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  if (btnSubmit) {
    btnSubmit.addEventListener("click", () => {
      const selectCat = document.getElementById("select-payment-cat");
      const selectedAmount = selectCat ? selectCat.value : "2860000";
      const selectedDesc = selectCat ? selectCat.options[selectCat.selectedIndex].text : "500 Level Tuition & Academic Charges";
      modal.classList.add("hidden");
      if (typeof openRemitaCheckout === "function") {
        openRemitaCheckout(selectedAmount, selectedDesc);
      }
    });
  }
}

// 6. Calendar Interactive Day Selection
function initCalendar() {
  const days = document.querySelectorAll(".calendar-day-cell:not(.faint-day)");
  days.forEach(day => {
    day.addEventListener("click", () => {
      document.querySelectorAll(".calendar-day-cell").forEach(d => {
        d.classList.remove("selected-day");
        const dot = d.querySelector(".day-dot-indicator");
        if (dot) dot.remove();
      });

      day.classList.add("selected-day");
      const dot = document.createElement("span");
      dot.className = "day-dot-indicator";
      day.appendChild(dot);

      const dayNum = day.firstChild.textContent.trim();
      showToast("Schedule", `Viewing timetable for October ${dayNum}, 2026`, "info");
    });
  });
}

// 7. Toast System
function showToast(title, message, variant = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.style.maxWidth = "340px";
  toast.style.width = "100%";
  toast.style.padding = "0.75rem 1rem";
  toast.style.borderRadius = "10px";
  toast.style.backgroundColor = "#27272c";
  toast.style.border = "1px solid #383842";
  toast.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4)";
  toast.style.color = "#ffffff";
  toast.style.fontSize = "0.8rem";
  toast.style.pointerEvents = "auto";
  toast.style.transition = "all 0.25s ease";

  toast.innerHTML = `
    <strong style="display: block; color: ${variant === 'success' ? '#4ade80' : '#c084fc'};">${title}</strong>
    <span style="display: block; color: #94a3b8; font-size: 0.75rem; margin-top: 2px;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// 8. Remita Checkout Simulation
let openRemitaCheckout = null;

function initRemita() {
  const remitaModal = document.getElementById("modal-remita-checkout");
  const btnCloseRemita = document.getElementById("btn-close-remita");
  const viewForm = document.getElementById("remita-view-form");
  const viewReceipt = document.getElementById("remita-view-receipt");
  const displayAmount = document.getElementById("remita-display-amount");
  const transferAmount = document.getElementById("remita-transfer-amount");
  const totalPayableText = document.getElementById("remita-total-payable-text");
  const payBtnText = document.getElementById("remita-pay-btn-text");
  const paymentDesc = document.getElementById("remita-payment-desc");
  const receiptAmountDisplay = document.getElementById("receipt-amount-display");
  const receiptDateTime = document.getElementById("receipt-date-time");
  const btnCopyRrr = document.getElementById("btn-copy-rrr");
  const activeRrr = document.getElementById("remita-active-rrr");

  // Triggers on page
  const btnSchedulePay = document.getElementById("btn-schedule-pay-remita");
  const btnDuePay = document.getElementById("btn-due-pay-remita");

  openRemitaCheckout = function(amountNum = 2860000, desc = "500 Level Tuition & Academic Charges (2026/2027)") {
    if (!remitaModal) return;
    const formatted = Number(amountNum).toLocaleString();
    const serviceFee = 161.25;
    const totalWithFee = (Number(amountNum) + serviceFee).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (displayAmount) displayAmount.textContent = formatted;
    if (transferAmount) transferAmount.textContent = `₦${formatted}.00`;
    if (totalPayableText) totalPayableText.textContent = `₦${totalWithFee}`;
    if (payBtnText) payBtnText.textContent = `Pay ₦${formatted}.00 via Remita`;
    if (paymentDesc) paymentDesc.textContent = desc;
    if (receiptAmountDisplay) receiptAmountDisplay.textContent = `₦${formatted}.00`;

    // Reset view to form
    if (viewForm) viewForm.classList.remove("hidden");
    if (viewReceipt) viewReceipt.classList.add("hidden");

    remitaModal.classList.remove("hidden");
  };

  if (btnSchedulePay) {
    btnSchedulePay.addEventListener("click", () => {
      openRemitaCheckout(2860000, "500 Level Tuition & Academic Charges (2026/2027)");
    });
  }

  if (btnDuePay) {
    btnDuePay.addEventListener("click", () => {
      openRemitaCheckout(2860000, "500 Level Full School Fees (2026/2027)");
    });
  }

  if (btnCloseRemita) {
    btnCloseRemita.addEventListener("click", () => {
      remitaModal.classList.add("hidden");
    });
  }

  if (remitaModal) {
    remitaModal.addEventListener("click", (e) => {
      if (e.target === remitaModal) remitaModal.classList.add("hidden");
    });
  }

  // Copy RRR
  if (btnCopyRrr && activeRrr) {
    btnCopyRrr.addEventListener("click", () => {
      navigator.clipboard.writeText(activeRrr.textContent.trim()).then(() => {
        btnCopyRrr.textContent = "Copied!";
        showToast("Remita RRR", "RRR copied to clipboard: " + activeRrr.textContent.trim(), "success");
        setTimeout(() => { btnCopyRrr.textContent = "Copy"; }, 2000);
      });
    });
  }

  // Channel Tabs
  const channelTabs = document.querySelectorAll(".remita-tab-btn");
  const channelContents = {
    card: document.getElementById("remita-channel-card"),
    transfer: document.getElementById("remita-channel-transfer"),
    ussd: document.getElementById("remita-channel-ussd")
  };

  channelTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      channelTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-channel");
      Object.keys(channelContents).forEach(key => {
        if (channelContents[key]) {
          channelContents[key].classList.toggle("hidden", key !== target);
          channelContents[key].classList.toggle("active", key === target);
        }
      });
    });
  });

  // Pay Simulation Buttons
  const payButtons = [
    document.getElementById("btn-remita-submit-pay"),
    document.getElementById("btn-remita-transfer-confirm"),
    document.getElementById("btn-remita-ussd-confirm")
  ];

  payButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      const originalHtml = btn.innerHTML;
      btn.innerHTML = `<span class="remita-dot"></span> Contacting Bank &amp; Verifying RRR...`;
      btn.style.pointerEvents = "none";
      btn.style.opacity = "0.8";

      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";

        // Switch to receipt view
        if (viewForm) viewForm.classList.add("hidden");
        if (viewReceipt) viewReceipt.classList.remove("hidden");

        const now = new Date();
        const dateFormatted = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        const timeFormatted = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        if (receiptDateTime) receiptDateTime.textContent = `${dateFormatted}, ${timeFormatted}`;

        showToast("Payment Successful", "Remita transaction verified! Ref: REM-2026-992147-BHU", "success");
      }, 1200);
    });
  });

  // Print Receipt Button
  const btnPrint = document.getElementById("btn-remita-print");
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }

  // Update Portal Balance & Finish Button
  const btnDone = document.getElementById("btn-remita-done");
  if (btnDone) {
    btnDone.addEventListener("click", () => {
      remitaModal.classList.add("hidden");

      // Update KPI Cards
      const paidKpi = document.getElementById("kpi-tuition-paid");
      const balanceKpi = document.getElementById("kpi-tuition-balance");
      const balanceIcon = document.getElementById("kpi-balance-icon");

      if (paidKpi) paidKpi.textContent = "₦2,860,000";
      if (balanceKpi) {
        balanceKpi.textContent = "₦0";
        balanceKpi.classList.remove("val-red");
        balanceKpi.classList.add("val-green");
      }
      if (balanceIcon) {
        balanceIcon.classList.remove("icon-circle-red");
        balanceIcon.classList.add("icon-circle-green");
        balanceIcon.innerHTML = `
          <svg class="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        `;
      }

      // Update Due Breakdown Card
      const dueAmount50 = document.getElementById("due-amount-50");
      const dueAmountFull = document.getElementById("due-amount-full");
      const dueAmountPaid = document.getElementById("due-amount-paid");
      const dueBtn = document.getElementById("btn-due-pay-remita");

      if (dueAmount50) dueAmount50.textContent = "₦0 (Cleared)";
      if (dueAmountFull) dueAmountFull.textContent = "₦0 (Cleared)";
      if (dueAmountPaid) dueAmountPaid.textContent = "₦2,860,000";
      if (dueBtn) {
        dueBtn.outerHTML = `<span class="badge-cleared-green" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;">Fees Cleared ✓</span>`;
      }

      // Update Schedule View button
      if (btnSchedulePay) {
        btnSchedulePay.outerHTML = `<span class="badge-cleared-green" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;">Fees Paid ✓</span>`;
      }

      // Update Student Profile Status Badge
      const statusBadge = document.querySelector(".badge-insufficient");
      if (statusBadge) {
        statusBadge.className = "badge-cleared-green";
        statusBadge.textContent = "Paid in Full ✓";
      }

      showToast("Bursary Updated", "Tuition balance cleared to ₦0. All 500 Level fees settled.", "success");
    });
  }
}
