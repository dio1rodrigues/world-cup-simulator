function getStatusBannerContainerClassName(statusVariant) {
  if (statusVariant === 'success') {
    return 'rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4'
  }

  if (statusVariant === 'error') {
    return 'rounded-2xl border border-red-500/20 bg-red-500/10 p-4'
  }

  if (statusVariant === 'info') {
    return 'rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4'
  }

  return 'rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4'
}

function getStatusBannerTextClassName(statusVariant) {
  if (statusVariant === 'success') {
    return 'text-sm text-emerald-200'
  }

  if (statusVariant === 'error') {
    return 'text-sm text-red-200'
  }

  if (statusVariant === 'info') {
    return 'text-sm text-blue-200'
  }

  return 'text-sm text-amber-200'
}

function StatusBanner(props) {
  const { statusMessage, statusVariant } = props

  const statusBannerContainerClassName =
    getStatusBannerContainerClassName(statusVariant)

  const statusBannerTextClassName =
    getStatusBannerTextClassName(statusVariant)

  return (
    <section className={statusBannerContainerClassName}>
      <p className={statusBannerTextClassName}>{statusMessage}</p>
    </section>
  )
}

export default StatusBanner