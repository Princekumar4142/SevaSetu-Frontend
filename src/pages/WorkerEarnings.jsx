import { useState } from "react";
import Button from "../components/Button";

const STATEMENTS = [
  { id: "TX-9901", date: "Today, 12:45 PM", desc: "Bathroom Cleaning & Dusting (BK-948210)", amount: 762, type: "CREDIT", status: "SETTLED" },
  { id: "TX-9844", date: "28 Aug 2026", desc: "AC Deep Servicing (BK-829104)", amount: 848, type: "CREDIT", status: "SETTLED" },
  { id: "TX-9721", date: "26 Aug 2026", desc: "Instant UPI Withdrawal to HDFC Bank (•••• 4920)", amount: -5000, type: "DEBIT", status: "SUCCESS" },
  { id: "TX-9610", date: "25 Aug 2026", desc: "Electrical Rewiring & Socket Fix (BK-74819)", amount: 1250, type: "CREDIT", status: "SETTLED" },
  { id: "TX-9502", date: "21 Aug 2026", desc: "Cooperative Quarterly Dividend Bonus", amount: 1450, type: "CREDIT", status: "SETTLED" },
];

export default function WorkerEarnings() {
  const [balance, setBalance] = useState(8450);
  const [withdrawing, setWithdrawing] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const handleWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setBalance(0);
      setPayoutSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Earnings &amp; Payouts</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Track gross income, cooperative dividends, welfare reserves, and transfer funds to your bank
          </p>
        </div>
        <Button
          variant="purple"
          disabled={balance === 0 || withdrawing}
          onClick={handleWithdraw}
          className="self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">account_balance</span>
          {withdrawing ? "Processing..." : `Withdraw ₹${balance.toLocaleString()}`}
        </Button>
      </div>

      {payoutSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-brand-success fill">check_circle</span>
            <div>
              <p className="font-label-md font-bold">Instant Payout Initiated!</p>
              <p className="font-status-badge text-status-badge text-emerald-700">
                ₹8,450 successfully transferred to your linked HDFC Bank account (•••• 4920) via IMPS.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPayoutSuccess(false)}
            className="text-emerald-900 text-status-badge font-bold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant font-bold">
              Available Balance
            </span>
            <span className="w-8 h-8 rounded-full bg-emerald-50 text-brand-success flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            </span>
          </div>
          <p className="font-headline-md text-headline-md font-bold text-on-surface">
            ₹{balance.toLocaleString()}
          </p>
          <p className="font-status-badge text-status-badge text-brand-success font-medium mt-1">
            Ready for instant bank withdrawal
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant font-bold">
              This Month Gross
            </span>
            <span className="w-8 h-8 rounded-full bg-brand-purple-light text-brand-purple flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
            </span>
          </div>
          <p className="font-headline-md text-headline-md font-bold text-on-surface">₹34,250</p>
          <p className="font-status-badge text-status-badge text-brand-purple font-medium mt-1">
            +18% compared to last month
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant font-bold">
              Co-op Dividend Share (8%)
            </span>
            <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">pie_chart</span>
            </span>
          </div>
          <p className="font-headline-md text-headline-md font-bold text-on-surface">₹2,740</p>
          <p className="font-status-badge text-status-badge text-on-surface-variant mt-1">
            Quarterly cooperative profit pool
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant font-bold">
              Welfare &amp; Pension (2%)
            </span>
            <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
            </span>
          </div>
          <p className="font-headline-md text-headline-md font-bold text-on-surface">₹685</p>
          <p className="font-status-badge text-status-badge text-on-surface-variant mt-1">
            Life insurance &amp; pension credit
          </p>
        </div>
      </div>

      {/* Weekly Earnings Chart Breakdown */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm">
        <h2 className="font-label-lg text-label-lg font-bold text-on-surface mb-4">
          Weekly Earnings Activity (Aug 2026)
        </h2>
        <div className="grid grid-cols-7 gap-2 pt-6 pb-2 items-end h-48 border-b border-outline-variant">
          {[
            { day: "Mon", amount: 1450, height: "45%" },
            { day: "Tue", amount: 2100, height: "65%" },
            { day: "Wed", amount: 950, height: "30%" },
            { day: "Thu", amount: 3200, height: "90%" },
            { day: "Fri", amount: 1800, height: "55%" },
            { day: "Sat", amount: 3600, height: "100%" },
            { day: "Sun", amount: 2800, height: "80%" },
          ].map((bar) => (
            <div key={bar.day} className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="font-status-badge text-[11px] text-on-surface-variant group-hover:text-brand-purple font-bold">
                ₹{bar.amount}
              </span>
              <div
                className="w-full max-w-[42px] bg-brand-purple-light group-hover:bg-brand-purple rounded-t-lg transition-all duration-300 relative"
                style={{ height: bar.height }}
              />
              <span className="font-status-badge text-status-badge text-on-surface-variant font-medium">
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Statements */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm">
        <h2 className="font-label-lg text-label-lg font-bold text-on-surface mb-4">
          Recent Transactions
        </h2>
        <div className="divide-y divide-outline-variant">
          {STATEMENTS.map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    tx.amount > 0 ? "bg-emerald-50 text-brand-success" : "bg-surface-container-high text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {tx.amount > 0 ? "arrow_downward" : "arrow_upward"}
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">{tx.desc}</p>
                  <p className="font-status-badge text-status-badge text-on-surface-variant">
                    {tx.id} · {tx.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`font-label-lg text-label-lg font-bold ${
                    tx.amount > 0 ? "text-brand-success" : "text-on-surface"
                  }`}
                >
                  {tx.amount > 0 ? `+₹${tx.amount}` : `−₹${Math.abs(tx.amount)}`}
                </p>
                <span className="font-status-badge text-[11px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
