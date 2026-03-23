import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Mail, Lock } from 'lucide-react-native';

import { GlassCard } from '@/src/components/common/GlassCard';
import { Button } from '@/src/components/common/Button';
import { SCREEN_WIDTH } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';

interface LoginScreenProps {
  onLogin: () => void;
  onGoogleLogin: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

function LoginScreenComponent({
  onLogin,
  onGoogleLogin,
  onSignUp,
  onForgotPassword,
}: LoginScreenProps) {
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const styles = React.useMemo(() => createStyles(colors, theme), [colors, theme]);

  const handleLogin = useCallback(() => {
    onLogin();
  }, [onLogin]);

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <View style={styles.logoInner} />
          </View>
          <Text style={styles.appTitle}>{t('login.appTitle')}</Text>
          <Text style={styles.appSubtitle}>{t('login.appSubtitle')}</Text>
        </View>

        {/* Login Form */}
        <GlassCard style={styles.formCard}>
          {/* Email */}
          <Text style={styles.fieldLabel}>{t('login.email')}</Text>
          <View style={styles.inputWrapper}>
            <Mail size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.textInput}
              placeholder={t('login.emailPlaceholder')}
              placeholderTextColor={colors.textTertiary}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text style={styles.fieldLabel}>{t('login.password')}</Text>
          <View style={styles.inputWrapper}>
            <Lock size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.textInput}
              placeholder={t('login.passwordPlaceholder')}
              placeholderTextColor={colors.textTertiary}
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
            />
          </View>

          {/* Login Button */}
          <Button
            title={t('login.login')}
            onPress={handleLogin}
            variant="primary"
            style={styles.loginButton}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('login.or')}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Login */}
          <TouchableOpacity
            onPress={onGoogleLogin}
            activeOpacity={0.7}
            style={styles.googleButton}
          >
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleText}>{t('login.loginWithGoogle')}</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
            <Text style={styles.forgotText}>{t('login.forgotPassword')}</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Sign Up */}
        <View style={styles.signUpRow}>
          <Text style={styles.signUpLabel}>{t('login.noAccount')}</Text>
          <TouchableOpacity onPress={onSignUp} activeOpacity={0.7}>
            <Text style={styles.signUpLink}>{` ${t('login.signUp')}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export const LoginScreen = React.memo(LoginScreenComponent);

const createStyles = (
  colors: ReturnType<typeof useAppTheme>['colors'],
  theme: ReturnType<typeof useAppTheme>['theme'],
) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },

  // ─── Logo ───────────────────────────
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoBox: {
    width: SCREEN_WIDTH * 0.18,
    height: SCREEN_WIDTH * 0.18,
    borderRadius: theme.radius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadow.neonGlow,
  },
  logoInner: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    borderRadius: theme.radius.lg,
    borderWidth: 3,
    borderColor: colors.textInverse,
  },
  appTitle: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs,
  },
  appSubtitle: {
    ...theme.typography.subtitle,
  },

  // ─── Form Card ──────────────────────
  formCard: {
    width: '100%',
    padding: theme.spacing.lg,
  },
  fieldLabel: {
    ...theme.typography.label,
    color: colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.glass.input,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  textInput: {
    flex: 1,
    ...theme.typography.input,
    padding: 0,
  },

  // ─── Login Button ───────────────────
  loginButton: {
    width: '100%',
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    ...theme.shadow.neonGlow,
  },

  // ─── Divider ────────────────────────
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...theme.typography.caption,
    paddingHorizontal: theme.spacing.md,
  },

  // ─── Google ─────────────────────────
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.glass.card,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  googleText: {
    ...theme.typography.buttonText,
  },

  // ─── Forgot & Sign Up ──────────────
  forgotText: {
    ...theme.typography.label,
    color: colors.primary,
    textAlign: 'center',
  },
  signUpRow: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
  },
  signUpLabel: {
    ...theme.typography.caption,
  },
  signUpLink: {
    ...theme.typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
