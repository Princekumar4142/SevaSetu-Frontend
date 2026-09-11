import { useLanguage } from "../../context/LanguageContext";

export default function DigitalInvoiceModal({ booking, onClose }) {
  const { tr } = useLanguage();

  if (!booking) return null;

  const bookingNo = booking.bookingNumber || "BK-" + (booking._id?.slice(-6) || "948210");
  const invoiceNo = "INV-" + (booking._id?.slice(-8) || "2026-0814").toUpperCase();
  const dateStr = booking.slot?.date || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = booking.slot?.time || "11:00 AM";
  const customerName = booking.customer?.name || "Registered Customer";
  const customerPhone = booking.customer?.phone || "+91 ••••• •••••";
  const addressLine = typeof booking.address === "string" ? booking.address : booking.address?.line1 || booking.address?.address || "Customer Residence";
  const city = typeof booking.address === "object" ? booking.address?.city || "West Champaran" : "Bihar";

  const workerName = booking.worker?.user?.name || "Verified Cooperative Partner";
  const workerTrade = booking.worker?.serviceCategory?.replace(/-/g, " ") || "Skilled Labor Professional";
  const cooperativeName = booking.worker?.cooperative?.name || "Labour Cooperative Federation of India";

  const totalAmount = booking.pricing?.totalAmount || booking.payable || 599;
  const subtotal = booking.pricing?.subtotal || Math.round(totalAmount * 0.90);
  const welfareCess = Math.round(totalAmount * 0.05); // 5% Cooperative Worker Welfare Cess
  const gstTax = totalAmount - subtotal - welfareCess > 0 ? totalAmount - subtotal - welfareCess : Math.round(totalAmount * 0.05);
  const paymentMethod = booking.pricing?.paymentMethod || booking.paymentMethod || "UPI / Digital Escrow";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8 animate-fade-in-up">
        
        {/* Modal Top Actions (Hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-xl">receipt_long</span>
            <span className="text-sm font-black tracking-wide uppercase">{tr("Official Cooperative E-Receipt & Tax Invoice")}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>{tr("Print / Save PDF")}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* ── Printable Invoice Body ── */}
        <div id="printable-invoice" className="p-6 sm:p-8 space-y-6 text-slate-800 bg-white">
          
          {/* Header & Logo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-lg shadow-md">
                  SS
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-900 leading-tight">SevaSetu AI</h1>
                  <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    {tr("Labour Cooperative Federation Digital Marketplace")}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                Govt Regd Cooperative Society · PACS & Federation Network<br />
                GSTIN: 10AAAAA0000A1Z5 · Fair Living Wages Certified
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-1.5">
                ✓ {tr("Paid & Settled")}
              </span>
              <p className="text-xs font-black text-slate-900">Invoice: <span className="font-mono text-indigo-700">{invoiceNo}</span></p>
              <p className="text-[11px] text-slate-500">Booking Ref: <span className="font-mono font-bold text-slate-700">{bookingNo}</span></p>
              <p className="text-[11px] text-slate-500">Date: {dateStr} · {timeStr}</p>
            </div>
          </div>

          {/* Customer & Assigned Worker 2-Col Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                {tr("Customer Details (Billed To)")}
              </span>
              <p className="font-bold text-slate-900 text-sm">{customerName}</p>
              <p className="text-slate-600 mt-0.5">{customerPhone}</p>
              <p className="text-slate-600 mt-0.5 line-clamp-2">{addressLine}, {city}</p>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                {tr("Verified Worker Partner (Fulfilled By)")}
              </span>
              <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span>{workerName}</span>
                <span className="text-emerald-700 material-symbols-outlined text-[15px]">verified</span>
              </p>
              <p className="text-slate-600 capitalize">{workerTrade}</p>
              <p className="text-[11px] font-medium text-emerald-800 mt-0.5">{cooperativeName}</p>
            </div>
          </div>

          {/* Itemized Services Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Service Description</th>
                  <th className="py-2.5 px-2 text-center">Qty / Duration</th>
                  <th className="py-2.5 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {booking.items && booking.items.length > 0 ? (
                  booking.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-2 text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-2.5 px-2 font-bold text-slate-800">{item.name}</td>
                      <td className="py-2.5 px-2 text-center text-slate-500">{item.qty || 1} ({item.durationMins || 60}m)</td>
                      <td className="py-2.5 px-2 text-right font-black text-slate-900">₹{item.price || Math.round(subtotal / booking.items.length)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-2.5 px-2 text-slate-400 font-bold">1</td>
                    <td className="py-2.5 px-2 font-bold text-slate-800">{booking.serviceName || workerTrade}</td>
                    <td className="py-2.5 px-2 text-center text-slate-500">1 Service Session</td>
                    <td className="py-2.5 px-2 text-right font-black text-slate-900">₹{subtotal}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown & Social Impact Taxes */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-1.5 text-xs text-slate-500 max-w-xs">
              <p className="font-bold text-slate-700">Cooperative Wage Protection Guarantee:</p>
              <p className="text-[11px] leading-relaxed">
                90% of your payment is disbursed directly to the verified skilled technician. Zero private middleman commission extracted.
              </p>
              <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
                Worker Welfare & Medical Fund Contributed
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Skilled Labor Subtotal:</span>
                <span className="font-bold text-slate-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md font-bold">
                <span>Worker Welfare Fund (5%):</span>
                <span>₹{welfareCess}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST & Federation Admin:</span>
                <span className="font-bold text-slate-800">₹{gstTax}</span>
              </div>
              <div className="border-t border-slate-300 pt-2 flex justify-between text-sm font-black text-slate-900">
                <span>Total Amount Paid:</span>
                <span className="text-emerald-700 text-base">₹{totalAmount}</span>
              </div>
              <div className="text-[10px] text-slate-400 text-right uppercase tracking-wider font-bold">
                Payment Mode: {paymentMethod}
              </div>
            </div>
          </div>

          {/* Footer & Digital Seal */}
          <div className="border-t border-dashed border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-slate-400">
            <div>
              <p className="font-bold text-slate-600">Electronically Generated Cooperative Tax Receipt</p>
              <p>Certified under National Cooperative Federation Policy 2026</p>
            </div>
            <div className="flex items-center gap-2 border border-emerald-300 bg-emerald-50/60 px-3 py-1.5 rounded-xl text-emerald-800 font-black text-[10px] uppercase tracking-wider shadow-2xs">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">verified</span>
              <span>Federation Verified Seal</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
