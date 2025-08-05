import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, format } from 'date-fns';

const ActivityHeatmap = ({ activities }) => {

  // Transform activities into heatmap format
  const heatmapData = activities.reduce((acc, act) => {
    const date = format(new Date(act.date), 'yyyy-MM-dd');
    const existing = acc.find(a => a.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div>
      <h3>Activity Heatmap</h3>
      <CalendarHeatmap
        startDate={subDays(new Date(), 150)}
        endDate={new Date()}
        values={heatmapData}
        classForValue={value => {
          if (!value) return 'color-empty';
          if (value.count > 4) return 'color-github-4';
          if (value.count > 2) return 'color-github-3';
          if (value.count > 1) return 'color-github-2';
          return 'color-github-1';
        }}
        tooltipDataAttrs={value => {
          if (!value || !value.date) return null;
          return {
            'data-tip': `${value.date}: ${value.count} activity`,
          };
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default ActivityHeatmap;
