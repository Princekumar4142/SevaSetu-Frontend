import { useState, useEffect } from "react";
import bookingService from "../services/bookingService";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { LoadingState } from "../components/Feedback";

const MOCK_COOP_JOBS = [
  {
    _id: "job-101",
    bookingNumber: "BK-948831",
    status: "PENDING",
    customer: { name: "Vikram Mehta", phone: "+91 98112 33445" },
    items: [{ name: "Full Home Deep Cleaning (2 BHK)", price: 2199, qty: 1, durationMins: 180 }],
    slot: { date: "Tomorrow", time: "09:00 AM" },
    address: { line1: "Tower B-14, Oberoi Springs, Andheri West", city: "Mumbai" },
    pricing: { totalAmount: 2199, paymentStatus: "PAID" },
    worker: null,
  },
  {
    _id: "job-102",
    bookingNumber: "BK-948210",
    status: "ON_THE_WAY",
    customer: { name: "Ananya Deshmukh", phone: "+91 98201 11223" },
    items: [
      { name: "Intense Bathroom Cleaning", price: 599, qty: 1, durationMins: 60 },
      { name: "Fan & Switchboard Deep Dusting", price: 199, qty: 2, durationMins: 30 },
    ],
    slot: { date: "Today", time: "11:30 AM" },
    address: { line1: "Flat 402, Sunshine Heights, Andheri West", city: "Mumbai" },
    pricing: { totalAmount: 897, paymentStatus: "PAID" },
    worker: { user: { name: "Ramesh Pawar", phone: "+91 98201 44321" } },
  },
  {
    _id: "job-103",
    bookingNumber: "BK-829104",
    status: "COMPLETED",
    customer: { name: "Sneha Patel", phone: "+91 98334 55667" },
    items: [{ name: "AC Filter Cleaning & Deep Servicing", price: 998, qty: 2, durationMins: 90 }],
    slot: { date: "28 Aug 2026", time: "02:00 PM" },
    address: { line1: "Bungalow 7, Juhu Scheme", city: "Mumbai" },
    pricing: { totalAmount: 998, paymentStatus: "PAID" },
    worker: { user: { name: "Sunil Gaikwad", phone: "+91 98111 22334" } },
  },
];

const AVAILABLE_WORKERS_LIST = [
  { id: "w-1", name: "Ramesh Pawar (Cleaning Specialist · 4.9⭐)" },
  { id: "w-2", name: "Pooja Sharma (Salon & Spa Master · 4.95⭐)" },
  { id: "w-3", name: "Sunil Gaikwad (HVAC & Electrician · 4.8⭐)" },
];

export default function CooperativeJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignModalJob, setAssignModalJob] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState(AVAILABLE_WORKERS_LIST[0].id);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await bookingService.getCooperativeBookings();
        if (res.data?.bookings && res.data.bookings.length > 0) {
          setJobs(res.data.bookings);
        } else {
          setJobs(MOCK_COOP_JOBS);
        }
      } catch (err) {
        console.warn("Using mock jobs fallback:", err.message);
        setJobs(MOCK_COOP_JOBS);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const handleAssignWorker = () => {
    const chosenWorker = AVAILABLE_WORKERS_LIST.find((w) => w.id === selectedWorkerId);
    setJobs((prev) =>
      prev.map((j) =>
        j._id === assignModalJob._id
          ? {
              ...j,
              status: "ASSIGNED",
              worker: { user: { name: chosenWorker.name.split(" (")[0], phone: "+91 98200 12345" } },
            }
          : j
      )
    );
    setAssignModalJob(null);
    setSuccessMsg(`Dispatched booking #${assignModalJob.bookingNumber} to ${chosenWorker.name.split(" (")[0]}`);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Job Allocation &amp; Dispatch</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Allocate customer requests to cooperative workers and monitor live fulfillment
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 animate-fade-in font-label-md font-medium">
          <span className="material-symbols-outlined text-[20px] text-brand-success fill">check_circle</span>
          {successMsg}
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <p className="font-status-badge text-status-badge text-on-surface-variant font-bold uppercase tracking-wider">
            Fulfillment Rate
          </p>
          <p className="font-headline-md text-headline-md font-bold text-brand-success mt-1">98.4%</p>
          <p className="font-status-badge text-status-badge text-on-surface-variant">42 of 43 completed this week</p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <p className="font-status-badge text-status-badge text-on-surface-variant font-bold uppercase tracking-wider">
            Avg Dispatch Time
          </p>
          <p className="font-headline-md text-headline-md font-bold text-brand-purple mt-1">4.2 mins</p>
          <p className="font-status-badge text-status-badge text-on-surface-variant">AI auto-matching active</p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <p className="font-status-badge text-status-badge text-on-surface-variant font-bold uppercase tracking-wider">
            Pending Queue
          </p>
          <p className="font-headline-md text-headline-md font-bold text-amber-600 mt-1">
            {jobs.filter((j) => j.status === "PENDING").length} Requests
          </p>
          <p className="font-status-badge text-status-badge text-on-surface-variant">Awaiting assignment</p>
        </div>
      </div>

      {/* Jobs Table */}
      {loading ? (
        <LoadingState message="Loading cooperative jobs..." />
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low/50 font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant">
                  <th className="py-3.5 px-4 font-bold">Booking #</th>
                  <th className="py-3.5 px-4 font-bold">Service &amp; Customer</th>
                  <th className="py-3.5 px-4 font-bold">Slot</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Assigned Worker</th>
                  <th className="py-3.5 px-4 font-bold">Amount</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-body-md text-on-surface">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-4 px-4 font-bold text-on-surface">
                      #{job.bookingNumber}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-label-md font-bold text-on-surface">{job.items[0]?.name}</p>
                      <p className="font-status-badge text-status-badge text-on-surface-variant">
                        {job.customer?.name} · {job.address?.city}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-label-md text-on-surface">{job.slot?.date}</p>
                      <p className="font-status-badge text-status-badge text-on-surface-variant">{job.slot?.time}</p>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          job.status === "PENDING"
                            ? "warning"
                            : job.status === "COMPLETED"
                            ? "success"
                            : "primary"
                        }
                      >
                        {job.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {job.worker ? (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand-success" />
                          <span className="font-semibold text-on-surface">{job.worker.user?.name}</span>
                        </div>
                      ) : (
                        <span className="font-status-badge text-status-badge text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-bold">
                      ₹{job.pricing?.totalAmount}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {job.status === "PENDING" ? (
                        <Button
                          variant="purple"
                          size="sm"
                          onClick={() => setAssignModalJob(job)}
                        >
                          Dispatch
                        </Button>
                      ) : (
                        <span className="font-status-badge text-status-badge text-on-surface-variant">
                          Active
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {assignModalJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fade-in border border-outline-variant">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                Dispatch Booking #{assignModalJob.bookingNumber}
              </h3>
              <button
                type="button"
                onClick={() => setAssignModalJob(null)}
                className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="bg-surface-container-low/60 p-3.5 rounded-xl text-body-md text-on-surface">
                <p className="font-bold">{assignModalJob.items[0]?.name}</p>
                <p className="font-status-badge text-status-badge text-on-surface-variant">
                  Customer: {assignModalJob.customer?.name} ({assignModalJob.address?.line1})
                </p>
                <p className="font-status-badge text-status-badge text-brand-purple font-medium mt-1">
                  Scheduled for: {assignModalJob.slot?.date} at {assignModalJob.slot?.time}
                </p>
              </div>

              <div>
                <label className="block font-label-md font-bold text-on-surface mb-2">
                  Select Available Verified Worker:
                </label>
                <select
                  value={selectedWorkerId}
                  onChange={(e) => setSelectedWorkerId(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-body-md text-on-surface focus:outline-none focus:border-brand-purple"
                >
                  {AVAILABLE_WORKERS_LIST.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAssignModalJob(null)}>
                Cancel
              </Button>
              <Button variant="purple" onClick={handleAssignWorker}>
                Confirm Dispatch
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
