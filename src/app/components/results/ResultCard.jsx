import { Trophy, Users, BarChart2, Percent } from 'lucide-react'
import Text from '../ui/Text'
import clsx from 'clsx'

export default function ResultCard({ result, onStatusClick }) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-5 shadow-sm">
      {/* Status / Publish */}
      <div className="flex items-start justify-end gap-4">
        {result.publish ? (
          <span
            className={clsx(
              'px-2 py-0.5 text-xs rounded-md font-medium whitespace-nowrap',
              result.status === 'published'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            )}
          >
            {capitalize(result.status)}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onStatusClick(result.id)}
            className="px-2 py-0.5 bg-secondary-red text-white text-xs rounded-md font-medium"
          >
            {capitalize(result.status)}
          </button>
        )}
      </div>

      {/* Title & Location */}
      <div>
        <Text as="h3" variant="h4" className="leading-snug line-clamp-1">
          {result.title}
        </Text>
        <Text variant="muted">
          {result.location} · {capitalize(result.level)}
        </Text>
      </div>

      {/* 🏆 Winner Detailed Section */}
      {/* <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Trophy className="text-green-600" size={20} />
          <Text className="font-semibold text-green-800">
            {result.winner || '—'}
          </Text>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <WinnerStat
            icon={<Users size={14} />}
            label="Votes"
            value={Number(result.winnerVotes || 0).toLocaleString()}
          />
          <WinnerStat
            icon={<Percent size={14} />}
            label="Vote %"
            value={`${Number(result.winnerVotePercent || 0)}%`}
          />
          <WinnerStat
            icon={<BarChart2 size={14} />}
            label="Total Votes"
            value={Number(result.totalVotes || 0).toLocaleString()}
          />
        </div>
      </div> */}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <Stat
          icon={<Users size={16} />}
          label="Total Votes"
          value={Number(result.totalVotes || 0).toLocaleString()}
        />
        <Stat
          icon={<BarChart2 size={16} />}
          label="Votes Cast"
          value={Number(result.votesCast || result.totalVotes || 0).toLocaleString()}
        />
        <Stat
          icon={<BarChart2 size={16} />}
          label="Winner Votes"
          value={Number(result.winnerVotes || 0).toLocaleString()}
        />
      </div>

      {/* Candidates */}
      {Array.isArray(result.candidates) && result.candidates.length > 0 && (
        <div className="border-t pt-4 space-y-2">
          <Text className="text-sm font-semibold">
            Candidates
          </Text>

          <div className="space-y-2">
            {result.candidates.map((candidate, index) => (
              <div
                key={index}
                className={clsx(
                  'flex items-center justify-between rounded-md px-3 py-2 text-sm',
                  candidate.isWinner
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50'
                )}
              >
                <div className="flex items-center gap-2">
                  {candidate.isWinner && (
                    <Trophy size={14} className="text-green-600" />
                  )}
                  <span
                    className={clsx(
                      'font-medium',
                      candidate.isWinner && 'text-green-700'
                    )}
                  >
                    {candidate.name}
                  </span>
                </div>

                <span className="font-semibold text-gray-700">
                  {Number(candidate.votes || 0).toLocaleString()} votes
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <Text variant="muted" className="text-xs">
        Result Published: {formatDate(result.publishedAt)}
      </Text>
    </div>
  )
}

/* ---------- helpers ---------- */

function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-gray-500">{icon}</div>
      <Text className="text-sm font-semibold">{value}</Text>
      <Text variant="muted" className="text-xs">
        {label}
      </Text>
    </div>
  )
}

function WinnerStat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-green-600">{icon}</div>
      <Text className="text-sm font-semibold text-green-800">
        {value}
      </Text>
      <Text variant="muted" className="text-xs">
        {label}
      </Text>
    </div>
  )
}

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
