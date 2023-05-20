namespace Core;

public static class Validate
{
    public static bool IsValidEmail(string email)
    {
        var trimmed = email.Trim().ToLower();
        var parts = trimmed.Split('@');

        if (parts.Length != 2)
            return false;

        var firstPartAlphabet = "qwertyuiopasdfghjklzxcvbnm._-";
        var secondPartAlphabet = "qwertyuiopasdfghjklzxcvbnm";

        var secondParts = parts[1].Split('.');

        if (secondParts.Length != 2)
            return false;

        foreach (var c in parts[0])
            if (!firstPartAlphabet.Contains(c))
                return false;

        foreach (var c in secondParts[0])
            if (!secondPartAlphabet.Contains(c))
                return false;

        foreach (var c in secondParts[1])
            if (!secondPartAlphabet.Contains(c))
                return false;

        if (parts[0].StartsWith('.') || parts[0].EndsWith('.')
            || parts[0].StartsWith('_') || parts[0].EndsWith('_'))
            return false;

        if (parts[0].Contains("..") || parts[0].Contains("||"))
            return false;

        return true;
    }

    public static bool IsValidUsername(string input)
    {
        var normalSymbols = "qwertyuiopasdfghjklzxcvbnmйцукенгшщзхъфывапролджэячсмитьбюё1234567890";

        if (input.Length < 6 || input.Length > 32)
            return false;

        if (input.Trim() != input)
            return false;

        if (input.Contains("  "))
            return false;

        foreach (var c in input.ToLower())
            if (normalSymbols.Contains(c))
                return true;

        return false;
    }

    public static bool IsPasswordValid(string input)
        => input.Trim().Length >= 8 && input.Trim().Length <= 64;
}