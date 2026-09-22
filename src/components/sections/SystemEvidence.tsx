import sapLogon from "@/assets/sap-logon-770.png.asset.json";

/**
 * Original infrastructure evidence: a real SAP Logon screenshot from a
 * ServerFY environment, with the connection steps written out in crawlable HTML.
 */
const steps = [
  "Install SAP GUI 7.70 (or later) on your own Windows, macOS or Linux machine.",
  "Open SAP Logon and add a new connection entry for the system we issue.",
  "Enter the application server, instance number and system ID from your handover mail.",
  "Log on with your client, user and password — then change the password on first login.",
];

export function SystemEvidence() {
  return (
    <section className="section-y bg-soft-mesh">
      <div className="container-fy grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="type-eyebrow text-orange">From a live environment</p>
          <h2 className="mt-3 type-section text-foreground">How the access actually looks</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This is the SAP Logon window on a ServerFY connection. You add the entry once and log on from
            your own machine — no VPN client, no local SAP installation, no virtual machine to maintain.
            Server addresses, user names and passwords are never published; they are sent to you privately
            at handover.
          </p>
          <ol className="mt-6 space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-sm leading-relaxed text-foreground">
                <span className="icon-tile-soft grid size-6 shrink-0 place-items-center rounded-md text-xs font-black">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <figure className="neu-card rounded-2xl p-3 sm:p-4">
          <img
            src={sapLogon.url}
            alt="SAP Logon 770 window showing a ServerFY connection entry with system description and system ID"
            width={751}
            height={749}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl"
          />
          <figcaption className="px-2 py-3 text-xs text-muted-foreground">
            SAP Logon 770 — connection entry for a ServerFY hosted SAP system. Host names and credentials
            are withheld for security.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
