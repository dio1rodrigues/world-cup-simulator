function getStatusBannerVariantConfig(statusVariant) {
  if (statusVariant === 'success') {
    return {
      badgeLabel: 'Sucesso',
      title: 'Etapa concluída',
      containerClassName:
        'rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4',
      badgeClassName:
        'inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-200',
      titleClassName: 'text-sm font-semibold text-emerald-100',
      messageClassName: 'mt-1 text-sm text-emerald-200',
    }
  }

  if (statusVariant === 'error') {
    return {
      badgeLabel: 'Erro',
      title: 'Falha na operação',
      containerClassName:
        'rounded-2xl border border-red-500/20 bg-red-500/10 p-4',
      badgeClassName:
        'inline-flex rounded-full border border-red-500/20 bg-red-500/15 px-3 py-1 text-xs font-medium text-red-200',
      titleClassName: 'text-sm font-semibold text-red-100',
      messageClassName: 'mt-1 text-sm text-red-200',
    }
  }

  if (statusVariant === 'info') {
    return {
      badgeLabel: 'Status',
      title: 'Operação em andamento',
      containerClassName:
        'rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4',
      badgeClassName:
        'inline-flex rounded-full border border-blue-500/20 bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-200',
      titleClassName: 'text-sm font-semibold text-blue-100',
      messageClassName: 'mt-1 text-sm text-blue-200',
    }
  }

  return {
    badgeLabel: 'Atenção',
    title: 'Aguardando próxima etapa',
    containerClassName:
      'rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4',
    badgeClassName:
      'inline-flex rounded-full border border-amber-500/20 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-200',
    titleClassName: 'text-sm font-semibold text-amber-100',
    messageClassName: 'mt-1 text-sm text-amber-200',
  }
}

function StatusBanner(props) {
  const { statusMessage, statusVariant } = props

  const statusBannerVariantConfig = getStatusBannerVariantConfig(statusVariant)

  return (
    <section className={statusBannerVariantConfig.containerClassName}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className={statusBannerVariantConfig.badgeClassName}>
            {statusBannerVariantConfig.badgeLabel}
          </span>

          <h2 className={`mt-3 ${statusBannerVariantConfig.titleClassName}`}>
            {statusBannerVariantConfig.title}
          </h2>

          <p className={statusBannerVariantConfig.messageClassName}>
            {statusMessage}
          </p>
        </div>
      </div>
    </section>
  )
}

export default StatusBanner