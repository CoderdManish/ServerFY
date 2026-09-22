/**
 * Answer-first summaries (GEO): a direct, self-contained answer to the question
 * a visitor or an AI assistant is most likely asking on each page.
 * Keyed by page slug. Falls back to the page intro when absent.
 */
export const quickAnswers: Record<string, { question: string; answer: string }> = {
  "sap-s4-hana-server-access": {
    question: "What is an SAP S/4HANA practice server?",
    answer:
      "An SAP S/4HANA practice server is a remotely hosted, fully activated S/4HANA system that you log into with SAP GUI or the Fiori launchpad. ServerFY gives you your own user on a system that already has the core functional and technical scope switched on plus sample master data, so you can configure, post documents and write ABAP the same day. Access is rented by duration — typically a month at a time — instead of installing SAP on your own hardware.",
  },
  "sap-ecc-server-access": {
    question: "What is an SAP ECC practice server?",
    answer:
      "An SAP ECC practice server is a hosted SAP ERP Central Component system you reach over SAP GUI with your own login. It is used to learn and rehearse classic ECC configuration and transactions — FICO, MM, SD, PP, HCM — on a system with IDES-style sample data. ServerFY provisions the user, client and remote access; you pay for the access period rather than for hardware or licences.",
  },
  "sap-server-access": {
    question: "How do I get SAP server access for practice?",
    answer:
      "You choose the SAP system you need (S/4HANA or ECC) and an access duration, share your details, and ServerFY hands over SAP GUI connection details — application server, instance number, system ID, client, user and password. You install SAP GUI on your own laptop, add the connection and log on. Most environments are handed over within a few working hours on the same day.",
  },
  "sap-dedicated-server-access": {
    question: "What is a dedicated SAP server?",
    answer:
      "A dedicated SAP server is an environment reserved for you or your team alone — no other learners share the client, the data or the compute. You get administrator-level freedom to configure, create clients, run your own transports and keep your work intact for the whole rental period. It suits trainers, consultants and project teams; shared environments are cheaper and suit individual practice.",
  },
  "sap-shared-server-access": {
    question: "What is a shared SAP server?",
    answer:
      "A shared SAP server is a hosted SAP system where several learners each get their own user (and usually their own practice data range) on the same system. It is the most affordable way to practise SAP transactions and configuration, because the infrastructure cost is spread across users. You get the same SAP GUI access; you simply do not get exclusive administrative control.",
  },
  "sap-practice-servers": {
    question: "What is an SAP practice server?",
    answer:
      "An SAP practice server is a hosted, non-production SAP system rented purely for learning: running transactions, doing configuration in IMG, testing end-to-end business cycles and preparing for interviews or certification. It carries sample data rather than real business data, is accessed remotely with SAP GUI, and is billed for a fixed access period.",
  },
  "sap-training-servers": {
    question: "What is an SAP training server?",
    answer:
      "An SAP training server is an SAP environment sized for a batch of learners, where each participant gets a separate user and workspace so classroom exercises do not collide. Institutes and corporate trainers use it for scheduled batches; ServerFY sets up the users before the batch starts and keeps the system available for the whole programme.",
  },
  "sap-server-system-requirements": {
    question: "What do I need to access an SAP server remotely?",
    answer:
      "You need SAP GUI for Windows (or SAP GUI for Java on macOS/Linux), a stable internet connection of roughly 2 Mbps or better, and the connection details we issue: application server, instance number, system ID, client, user and password. Nothing is installed on your machine beyond SAP GUI — the SAP system itself runs on our infrastructure, so an ordinary 4 GB-RAM laptop is enough.",
  },
};
