namespace Laboratory;

internal class CRegex
{
    State _state = State.FirstStartExpected;
    
    readonly string _start;
    readonly string _end;

    public CRegex(string start, string end)
    {
        _start = start;
        _end = end;
    }

    public string Remove(string input)
    {
        var localStart = _start;
        var localEnd = _end;
        var startIndex = -1;
        var length = 0;

        List<Match> foundsMatches = new();

        for (int i = 0; i < input.Length; i++)
        {
            if (_state == State.FirstStartExpected)
            {
                if (input[i] == localStart[0])
                {
                    localStart = localStart[1..];
                    startIndex = i;
                    length++;

                    if (localStart.Length > 0)
                        _state = State.NextStartExpected;
                    else
                        _state = State.Any;
                }
            }

            else if (_state == State.NextStartExpected)
            {
                if (input[i] == localStart[0])
                {
                    localStart = localStart[1..];
                    length++;

                    if (localStart.Length > 0)
                        _state = State.NextStartExpected;
                    else
                        _state = State.Any;
                }

                else
                {
                    length = 0;
                    startIndex = -1;
                    localStart = _start;
                    _state = State.FirstStartExpected;
                }
            }

            else if (_state == State.Any)
            {
                if (input[i] != localEnd[0])
                {
                    length++;
                }

                if (input[i] == localEnd[0])
                {
                    localEnd = localEnd[1..];
                    length++;

                    if (localEnd.Length > 0)
                        _state = State.NextEndExpected;
                    else
                    {
                        foundsMatches.Add(new Match(startIndex, length, input.Substring(startIndex, length)));
                        localEnd = _end;
                        localStart = _start;
                        startIndex = -1;
                        length = 0;
                        _state = State.FirstStartExpected;
                    }
                }
            }

            else if (_state == State.NextEndExpected)
            {
                if (input[i] == localEnd[0])
                {
                    localEnd = localEnd[1..];
                    length++;

                    if (localEnd.Length == 0)
                    {
                        foundsMatches.Add(new Match(startIndex, length, input.Substring(startIndex, length)));
                        localEnd = _end;
                        localStart = _start;
                        startIndex = -1;
                        length = 0;
                        _state = State.FirstStartExpected;
                    }
                }

                else
                {
                    length++;
                    _state = State.Any;
                }
            }
        }

        var result = input;

        for (int i = foundsMatches.Count - 1; i >= 0; i--)
        {
            var match = foundsMatches[i];
            result = result.Remove(match.Index, match.Length);
        }

        while (result.Contains("\n\n"))
            result = result.Replace("\n\n", "\n");

        if (result.Length > 0)
            while (result[0] == '\r' || result[0] == '\n')
                result = result[1..];

        return result;
    }

    private enum State
    {
        FirstStartExpected,
        NextStartExpected,
        Any,
        NextEndExpected,
    }

    private class Match
    {
        public int Index { get; }
        public int Length { get; }
        public string Content { get; }

        public Match(int index, int length, string content)
        {
            Index = index;
            Length = length;
            Content = content;
        }
    }
}
