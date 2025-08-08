import { Head, usePage } from '@inertiajs/react';
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { Home, RotateCcw, FileText } from 'lucide-react';
import React from 'react';

// Update to your actual logo URL or base64
const companyLogo = '/build/assets/web-assets/edtech_logo.png';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#111827',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 40,
    marginBottom: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title_success: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 4,
  },
   title_error: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    marginVertical: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    borderBottomStyle: 'solid',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '40%',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    fontWeight: 'bold',
    color: '#111827',
  },
  tableCol: {
    width: '60%',
    padding: 8,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    color: '#374151',
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#9ca3af',
  },
});

interface ResponsePageProps {
  success?: Record<string, any>;
  error?: Record<string, any>;
}

// PDF Component
const InvoicePDF = ({
  data,
  isSuccess,
}: {
  data: Record<string, any>;
  isSuccess: boolean;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={companyLogo} style={styles.logo} />
        <Text style={isSuccess ? styles.title_success : styles.title_error}>
          {isSuccess ? 'Payment Invoice' : 'Payment Failed'}
        </Text>
        <Text style={styles.subtitle}>Course Enrollment Receipt</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.table}>
          {Object.entries(data).map(([key, value]) => (
            <View style={styles.tableRow} key={key}>
              <Text style={styles.tableColHeader}>
                {key.replace(/_/g, ' ').toUpperCase()}
              </Text>
              <Text style={styles.tableCol}>
                {typeof value === 'object'
                  ? JSON.stringify(value)
                  : String(value)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.footer}>
        This is a system-generated invoice. No signature is required. For
        support, contact support@yourcompany.com
      </Text>
    </Page>
  </Document>
);

// Main Page
const Response: React.FC = () => {
  const { props } = usePage<ResponsePageProps>();
  const response = props.success || props.error;
  const isSuccess = !!props.success;

  return (
    <>
      <Head title={isSuccess ? 'Payment Successful' : 'Payment Failed'} />

      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-xl rounded-lg bg-white p-6 text-center shadow-md">
          <h2
            className={`mb-2 text-2xl font-bold ${
              isSuccess ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isSuccess ? '✅ Payment Successful' : '❌ Payment Failed'}
          </h2>

          <p className="mb-4 text-gray-700">
            {isSuccess
              ? 'Thank you for your payment. Your transaction was successful.'
              : 'Oops! Something went wrong with the payment.'}
          </p>

          <div className="max-h-96 space-y-2 overflow-auto rounded border bg-gray-50 p-4 text-left text-sm">
            {response &&
              Object.entries(response).map(([key, value]) => (
                <div
                  className="flex justify-between border-b pb-1 text-sm"
                  key={key}
                >
                  <span className="font-semibold text-gray-700 capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="max-w-[60%] text-right break-words text-gray-900">
                    {typeof value === 'object'
                      ? JSON.stringify(value)
                      : String(value)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-white shadow transition hover:bg-blue-700"
          >
            <Home className="h-5 w-5" />
            Home
          </a>

          {!isSuccess && (
            <a
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full bg-gray-600 px-5 py-2.5 text-white shadow transition hover:bg-gray-700"
            >
              <RotateCcw className="h-5 w-5" />
              Try Again
            </a>
          )}

          {response && (
            <PDFDownloadLink
              document={<InvoicePDF data={response} isSuccess={isSuccess} />}
              fileName={`${
                isSuccess ? 'payment-invoice' : 'payment-failed'
              }.pdf`}
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-white shadow transition hover:bg-green-700"
            >
              <FileText className="h-5 w-5" />
              Download Invoice
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Response;
