export function SOWFooter() {
  return (
    <div className="border-t-2 border-gray-200 pt-6 text-center text-gray-600 text-sm">
      <p className="mb-2">This document is an estimate and not legally binding.</p>
      <p className="mb-2">
        This proposal represents the estimated hours and costs for the minimum viable product (MVP) implementation agreed upon for the project phase. 
        Additional complexity or requirements may increase final project cost based on actual hours required. Final invoice will reflect actual billable hours.
      </p>
      <p className="mb-2">
        Once reviewed and any adjustments are made, a finalized contract will be delivered through the {" "} 
        <a href="https://clients.nortonapplications.com">client portal</a>.
      </p>
      <p>
        You can find our full terms and conditions <a href="https://nortonapplications.com/terms">here</a>.
      </p>
    </div>
  )
}
