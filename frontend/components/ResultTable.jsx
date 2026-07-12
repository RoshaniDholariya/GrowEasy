"use client";

export default function ResultTable({ result, stats }) {

  if (!result) return null;

  const imported = Array.isArray(result?.imported) ? result.imported : [];
  const skipped = Array.isArray(result?.skipped) ? result.skipped : [];

  const importedCount =
    stats?.imported ?? stats?.totalImported ?? imported.length ?? 0;
  const skippedCount =
    stats?.skipped ?? stats?.totalSkipped ?? skipped.length ?? 0;
  const totalCount = importedCount + skippedCount;

  const successRate =
    totalCount === 0
      ? 0
      : ((importedCount / totalCount) * 100).toFixed(1);

  return (
    <div className="mt-10">

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-green-500 text-white rounded-xl p-6">

          <h2 className="text-lg">Imported</h2>

          <p className="text-4xl font-bold">

            {importedCount}

          </p>

        </div>

        <div className="bg-red-500 text-white rounded-xl p-6">

          <h2 className="text-lg">Skipped</h2>

          <p className="text-4xl font-bold">

            {skippedCount}

          </p>

        </div>

        <div className="bg-blue-600 text-white rounded-xl p-6">

          <h2 className="text-lg">

            Success Rate

          </h2>

          <p className="text-4xl font-bold">

            {successRate}%

          </p>

        </div>

      </div>

      {/* Imported Records */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-5">

          Imported Records

        </h2>

        <div className="overflow-auto max-h-[500px]">

          <table className="min-w-full border">

            <thead className="bg-gray-100 sticky top-0">

              <tr>

                {imported.length > 0 &&
                  Object.keys(imported[0]).map((key) => (

                    <th
                      key={key}
                      className="border px-3 py-2"
                    >
                      {key}
                    </th>

                  ))}

              </tr>

            </thead>

            <tbody>

              {imported.map((row, index) => (

                <tr key={index}>

                  {Object.values(row).map((value, i) => (

                    <td
                      key={i}
                      className="border px-3 py-2"
                    >
                      {String(value)}
                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Skipped Records */}

      {skipped.length > 0 && (

        <div className="bg-white rounded-xl shadow p-6 mt-8">

          <h2 className="text-2xl font-semibold mb-5">

            Skipped Records

          </h2>

          <div className="space-y-3">

            {skipped.map((item, index) => (

              <div
                key={index}
                className="border rounded-lg p-4 bg-red-50"
              >

                <p>

                  <strong>Reason:</strong>{" "}

                  {item.reason.join(", ")}

                </p>

                <pre className="text-sm mt-2 overflow-auto">

                  {JSON.stringify(
                    item.record,
                    null,
                    2
                  )}

                </pre>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}