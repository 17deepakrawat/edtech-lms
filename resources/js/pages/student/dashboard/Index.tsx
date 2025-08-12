import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/student/dashboard',
  },
];

export default function StudentDashboard() {
  // Static data for demo
  const student = {
    name: 'Deepak Rawat',
    email: 'deepak@example.com',
    profile_photo_url: 'https://i.pravatar.cc/150?u=deepak',
  };

  const enrollments = [
    {
      id: 1,
      status: 'In Progress',
      progress: 40,
      course: {
        name: 'React for Beginners',
        duration: '5 hours',
        start_date: '2025-08-01',
      },
    },
    {
      id: 2,
      status: 'Completed',
      progress: 100,
      course: {
        name: 'Laravel Basics',
        duration: '7 hours',
        start_date: '2025-06-15',
      },
    },
  ];

  const payments = [
    { id: 1, course_name: 'React for Beginners', status: 'paid' },
    { id: 2, course_name: 'Laravel Basics', status: 'paid' },
  ];

  const notifications = [
    { id: 1, message: 'Your certificate for Laravel Basics is now available!' },
    { id: 2, message: 'New course "Advanced React" launching next week.' },
  ];

  const downloads = [
    { id: 1, name: 'React Course Notes.pdf', url: '#' },
    { id: 2, name: 'Laravel Basics Assignment.zip', url: '#' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="max-w-7xl mx-auto p-6 space-y-8 mt-20">

        {/* Welcome + Profile Card */}
        <section className="flex items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <img
            src={student.profile_photo_url}
            alt={`${student.name} profile`}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Welcome back, {student.name}!</h1>
            <p className="text-gray-600 dark:text-gray-300">Email: {student.email}</p>
          </div>
          <a
            href="/student/profile/edit"
            className="ml-auto inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            Edit Profile
          </a>
        </section>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Payments Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Payment Status</h2>
            {payments.length > 0 ? (
              <ul className="space-y-3 max-h-56 overflow-y-auto">
                {payments.map((pay) => (
                  <li key={pay.id} className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>{pay.course_name}</span>
                    <span
                      className={`font-semibold ${
                        pay.status === 'paid' ? 'text-green-500' :
                        pay.status === 'pending' ? 'text-yellow-500' :
                        'text-red-500'
                      }`}
                    >
                      {pay.status.charAt(0).toUpperCase() + pay.status.slice(1)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No payment records found.</p>
            )}
          </div>

          {/* Notifications Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Notifications</h2>
            {notifications.length > 0 ? (
              <ul className="space-y-2 max-h-56 overflow-y-auto text-gray-700 dark:text-gray-300">
                {notifications.map((note) => (
                  <li key={note.id} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-none">
                    {note.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No new notifications.</p>
            )}
          </div>

          {/* Downloads Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Downloads</h2>
            {downloads.length > 0 ? (
              <ul className="list-disc list-inside text-blue-600 dark:text-blue-400 space-y-1">
                {downloads.map((doc) => (
                  <li key={doc.id}>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No downloadable materials available.</p>
            )}
          </div>

        </div>

        {/* Enrolled Courses Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">My Courses</h2>
          {enrollments.length > 0 ? (
            <div className="space-y-6 max-h-[600px] overflow-y-auto">
              {enrollments.map((enroll) => (
                <div
                  key={enroll.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{enroll.course.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Duration: {enroll.course.duration} | Start Date: {enroll.course.start_date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">Status: {enroll.status}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <progress
                      className="w-48 h-5 rounded-lg overflow-hidden"
                      max={100}
                      value={enroll.progress}
                    ></progress>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{enroll.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You have no enrolled courses.</p>
          )}
        </section>

        {/* Support Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Support</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">If you need help, contact us at:</p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Email: <a href="mailto:support@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@example.com</a></li>
            <li>Phone: <a href="tel:+911234567890" className="text-blue-600 dark:text-blue-400 hover:underline">+91 12345 67890</a></li>
          </ul>
        </section>

      </div>
    </AppLayout>
  );
}
