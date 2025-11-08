export const crowdingThresholds = {
  low: 30,
  medium: 70
}

export function getCrowdingLevel(value, thresholds = crowdingThresholds) {
  if (value < thresholds.low) {
    return 'low'
  }
  if (value < thresholds.medium) {
    return 'medium'
  }
  return 'high'
}

const crowdingColors = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444'
}

export function getCrowdingColor(value, thresholds = crowdingThresholds) {
  const level = getCrowdingLevel(value, thresholds)
  return crowdingColors[level]
}

